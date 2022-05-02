import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { AuthorityConstant } from 'src/shared/authority-constant';
import { serializeAxiosError } from 'src/shared/reducers/reducer.utils';

const API_URL = process.env.API_URL + '/admin/users';

// Initial state

const initialState = {
  loading: false,
  errorMessage: null,
  updateSuccess: null,
  userList: [],
  user: null,
  degree: null,
  total: 0,
};

// Actions
export const getUsers = createAsyncThunk(
  'userManager/fetch_user_list',
  async ({ userType, page, size }) => {
    if (userType === AuthorityConstant.ALL) {
      const res = await axios.get(API_URL, { params: { page, size } });
      return res.data;
    } else {
      const res = await axios.get(`${API_URL}/authority/${userType}`, {
        params: {
          page,
          size,
        },
      });
      return res.data;
    }
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const updateUser = createAsyncThunk(
  'userManager/update_user',
  async formData => {
    const res = await axios.put(API_URL, formData);
    return res.data;
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const getDegreeDoctor = createAsyncThunk(
  'admin/fetch_degree_doctor',
  async doctorId => {
    const res = await axios.get(`${API_URL}/degree/${doctorId}`);
    return res.data;
  },
  {
    serializeError: serializeAxiosError,
  }
);

// Slice

const userManagerSlice = createSlice({
  name: 'userManager',
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.userList = action.payload;
        state.total = action.payload.total || action.payload.length;
        state.loading = false;
        state.updateSuccess = null;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.errorMessage = action.error.message || 'Internal server error';
        state.loading = false;
      })
      .addCase(getUsers.pending, state => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.updateSuccess = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message || 'Internal server error';
        state.updateSuccess = false;
      })
      .addCase(updateUser.pending, state => {
        state.loading = true;
        state.updateSuccess = null;
        state.errorMessage = null;
      })
      .addCase(getDegreeDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.degree = action.payload;
      })
      .addCase(getDegreeDoctor.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message || 'Internal server error';
      })
      .addCase(getDegreeDoctor.pending, state => {
        state.loading = true;
        state.errorMessage = null;
      });
  },
});

export const { reset } = userManagerSlice.actions;

export default userManagerSlice.reducer;
