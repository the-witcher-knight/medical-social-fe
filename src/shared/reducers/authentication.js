import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { StorageAPI } from 'src/shared/util/storage-util';
import { parseJwt } from '../util/auth-util';
import { serializeAxiosError } from './reducer.utils';

export const AUTH_TOKEN_KEY = 'authToken';
// eslint-disable-next-line no-undef
const API_URL = process.env.API_URL;

const getToken = () =>
  StorageAPI.local.get(AUTH_TOKEN_KEY) || StorageAPI.session.get(AUTH_TOKEN_KEY);

export const initialState = {
  loading: false,
  isAuthenticated: false,
  loginSuccess: false,
  loginError: false, // Errors returned from the server
  showModalLogin: false,
  account: {}, // User account
  errorMessage: null,
  redirectMessage: null,
  sessionHasBeenFetched: false,
  logoutUrl: null,
};

// Actions

export const getAccount = createAsyncThunk(
  'authentication/get_account',
  async () => {
    const res = await axios.get(`${API_URL}/users/current-login`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.data;
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const authenticate = createAsyncThunk(
  'authentication/signin',
  async ({ username, password, rememberMe }) =>
    axios.post(`${API_URL}/authenticate`, { username, password, rememberMe }),
  {
    serializeError: serializeAxiosError,
  }
);

/**
 * Sign in with account
 * @param {string} username username of user
 * @param {string} password password of user
 * @param {boolean} rememberMe remember me
 * @returns jwt token
 */
export const signin =
  (username, password, rememberMe = false) =>
  async dispatch => {
    const result = await dispatch(authenticate({ username, password, rememberMe }));
    const response = result.payload; // as AxiosResponse;
    const bearerToken = response.data.id_token; // Bearer token from the server
    if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
      const jwt = bearerToken.slice(7, bearerToken.length);
      if (rememberMe) {
        StorageAPI.local.set(AUTH_TOKEN_KEY, jwt);
      } else {
        StorageAPI.session.set(AUTH_TOKEN_KEY, jwt);
      }
    } else {
      if (rememberMe) {
        StorageAPI.local.set(AUTH_TOKEN_KEY, bearerToken);
      } else {
        StorageAPI.session.set(AUTH_TOKEN_KEY, bearerToken);
      }
    }
  };

export const signup = createAsyncThunk(
  'authentication/register',
  async user => {
    const formData = new FormData();
    Object.keys(user).forEach(k =>
      k === 'files' ? formData.append(k, user[k][0]) : formData.append(k, user[k])
    );
    axios.post(API_URL + '/admin/users', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const clearAuthToken = () => {
  if (StorageAPI.local.get(AUTH_TOKEN_KEY)) {
    StorageAPI.local.remove(AUTH_TOKEN_KEY);
  }
  if (StorageAPI.session.get(AUTH_TOKEN_KEY)) {
    StorageAPI.session.remove(AUTH_TOKEN_KEY);
  }
};

export const logout = () => dispatch => {
  clearAuthToken();
  dispatch(logoutSession());
};

export const clearAuthentication = messageKey => dispatch => {
  clearAuthToken();
  dispatch(authError(messageKey));
  dispatch(clearAuth());
};

// Slice

export const AuthenticationSlice = createSlice({
  name: 'authentication',
  initialState, // as AuthenticationState,
  reducers: {
    logoutSession() {
      return {
        ...initialState,
        showModalLogin: true,
      };
    },
    authError(state, action) {
      return {
        ...state,
        showModalLogin: true,
        redirectMessage: action.payload,
      };
    },
    clearAuth(state) {
      return {
        ...state,
        loading: false,
        showModalLogin: true,
        isAuthenticated: false,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(authenticate.rejected, (state, action) => ({
        ...initialState,
        errorMessage: action.error.message,
        showModalLogin: true,
        loginError: true,
      }))
      .addCase(authenticate.fulfilled, state => ({
        ...state,
        loading: false,
        loginError: false,
        showModalLogin: false,
        loginSuccess: true,
      }))
      .addCase(authenticate.pending, state => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, state => {
        state.loading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message || 'Could not register';
      })
      .addCase(signup.pending, state => {
        state.loading = true;
        state.errorMessage = '';
      })
      .addCase(getAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.account = action.payload;
      })
      .addCase(getAccount.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.errorMessage = action.error.message || 'Could not get account';
      })
      .addCase(getAccount.pending, state => {
        state.loading = true;
        state.errorMessage = '';
      });
  },
});

export const { logoutSession, authError, clearAuth } = AuthenticationSlice.actions;

// Reducer
export default AuthenticationSlice.reducer;
