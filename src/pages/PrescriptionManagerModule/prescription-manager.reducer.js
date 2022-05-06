import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { serializeAxiosError } from 'src/shared/reducers/reducer.utils';

const apiUrl = process.env.API_URL;

const initialState = {
  loading: false,
  errorMessage: null,
  updateSuccess: null,
  prescriptionList: [],
  prescription: null,
};

export const getPrescriptionListByLogin = createAsyncThunk(
  'prescription_manager/fetch_prescription_list',
  async login => {
    const res = await axios.get(`${apiUrl}/prescriptions/patient/${login}`);
    return res.data;
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const getPresciption = createAsyncThunk(
  'prescription_manager/fetch_prescription',
  async id => {
    const res = await axios.get(`${apiUrl}/prescriptions/${id}`);
    return res.data;
  },
  {
    serializeError: serializeAxiosError,
  }
);

const prescriptionManagerSlice = createSlice({
  name: 'prescription_manager',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getPrescriptionListByLogin.pending, (state, action) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(getPrescriptionListByLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.prescriptionList = action.payload;
      })
      .addCase(getPrescriptionListByLogin.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message || 'Something went wrong';
      })
      .addCase(getPresciption.pending, (state, action) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(getPresciption.fulfilled, (state, action) => {
        state.loading = false;
        state.prescription = action.payload;
      })
      .addCase(getPresciption.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message || 'Something went wrong';
      });
  },
});

export default prescriptionManagerSlice.reducer;
