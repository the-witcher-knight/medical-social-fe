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
  dataList: [],
  data: null,
  total: 0,
};

// Actions

export const getDoctors = createAsyncThunk(
  'admin/fetch_doctor_list',
  async (page, size) => {
    const res = await axios.get(`${API_URL}/authority/${AuthorityConstant.DOCTOR}`, {
      params: {
        page,
        size,
      },
    });
    return res;
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const updateDoctor = createAsyncThunk(
  'admin/update_doctor',
  async doctorFormData => {
    const res = await axios.put(API_URL, doctorFormData);
    return res;
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const getAllUser = createAsyncThunk(
  'admin/fetch_all_user_list',
  async () => {
    const res = await axios.get(API_URL);
    return res;
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const getDegreeDoctor = createAsyncThunk(
  'admin/fetch_degree_doctor',
  async doctorId => {
    const res = await axios.get(`${API_URL}/degree/${doctorId}`);
    return res;
  },
  {
    serializeError: serializeAxiosError,
  }
);

// Slice

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getDoctors.fulfilled, (state, action) => {
        state.dataList = action.payload.data;
        state.total = action.payload.total || action.payload.data.length;
        state.loading = false;
      })
      .addCase(getDoctors.rejected, (state, action) => {
        state.errorMessage = action.error.message || 'Internal server error';
        state.loading = false;
      })
      .addCase(getDoctors.pending, state => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(updateDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.updateSuccess = true;
      })
      .addCase(updateDoctor.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message || 'Internal server error';
        state.updateSuccess = false;
      })
      .addCase(updateDoctor.pending, state => {
        state.loading = true;
        state.updateSuccess = null;
        state.errorMessage = null;
      })
      .addCase(getDegreeDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
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

export const { reset } = adminSlice.actions;

export default adminSlice.reducer;
