import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiSingleton } from 'src/configs/singleton-api';
import { AuthorityConstant } from 'src/shared/authority-constant';
import { serializeAxiosError } from 'src/shared/reducers/reducer.utils';

const API_URL = ApiSingleton.getInstance().instance.apiUrl;

const initialState = {
  loading: false,
  pharmacyList: [],
  medicineList: [],
  errorMessage: null,
};

// Actions

export const getPharmacyList = createAsyncThunk(
  'pharmacy-view/fetch_pharmacy_list',
  async (page, size) => {
    const res = await axios.get(`${API_URL}/admin/users/authority/${AuthorityConstant.PHARMACY}`, {
      params: {
        page,
        size,
      },
    });
    return res.data;
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const getMedicineList = createAsyncThunk(
  'pharmacy-view/fetch_medicine_list',
  async ({ pharmacyId, page, size }) => {
    const res = await axios.get(`${API_URL}/pharmacy-medicines/pharmacy/${pharmacyId}`, {
      params: {
        page,
        size,
      },
    });
    return res.data;
  },
  {
    serializeError: serializeAxiosError,
  }
);

const pharmacyViewSlice = createSlice({
  name: 'pharmacy-view',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getPharmacyList.fulfilled, (state, action) => {
        state.pharmacyList = action.payload;
        state.loading = false;
      })
      .addCase(getPharmacyList.pending, state => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(getPharmacyList.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message || 'Internal Server Error';
      })
      .addCase(getMedicineList.fulfilled, (state, action) => {
        state.medicineList = action.payload;
        state.loading = false;
      })
      .addCase(getMedicineList.pending, state => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(getMedicineList.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message || 'Internal Server Error';
      });
  },
});

export default pharmacyViewSlice.reducer;
