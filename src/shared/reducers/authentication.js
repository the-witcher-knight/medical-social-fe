import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { StorageAPI } from 'src/shared/util/storage-util';
import { getAuthToken } from '../util/auth-util';
import { serializeAxiosError } from './reducer.utils';

export const AUTH_TOKEN_KEY = 'authToken';
const API_URL = process.env.API_URL;

export const initialState = {
  loading: false,
  isAuthenticated: false,
  loginSuccess: null,
  showModalLogin: false,
  account: {}, // User account
  updateSuccess: null,
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
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return res.data;
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const updateUser = createAsyncThunk(
  'userManager/update_user',
  async formData => {
    const res = await axios.put(API_URL + '/admin/users', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
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
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(authenticate.rejected, (state, action) => ({
        ...initialState,
        errorMessage: action.error.message,
        loginSuccess: false,
        showModalLogin: true,
      }))
      .addCase(authenticate.fulfilled, state => ({
        ...state,
        loading: false,
        showModalLogin: false,
        loginSuccess: true,
      }))
      .addCase(authenticate.pending, state => {
        state.loading = true;
        state.loginSuccess = null;
      })
      .addCase(signup.fulfilled, state => {
        state.loading = false;
        state.updateSuccess = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message || 'Could not register';
        state.updateSuccess = false;
      })
      .addCase(signup.pending, state => {
        state.loading = true;
        state.errorMessage = null;
        state.signup = null;
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
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.account = action.payload;
        state.updateSuccess = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message || 'Internal server error';
        state.updateSuccess = false;
      })
      .addCase(updateUser.pending, state => {
        state.loading = true;
        state.errorMessage = '';
        state.updateSuccess = null;
      });
  },
});

export const { logoutSession, authError, clearAuth, reset } = AuthenticationSlice.actions;

// Reducer
export default AuthenticationSlice.reducer;
