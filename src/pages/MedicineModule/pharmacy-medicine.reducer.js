import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { serializeAxiosError } from 'src/shared/reducers/reducer.utils';
import { getAuthToken } from 'src/shared/util/auth-util';

const initialState = {
  loading: false,
  updateSuccess: null,
  errorMessage: null,
  medicineList: [],
  medicine: null,
};

const apiUrl = process.env.API_URL;

const getConfigs = () => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAuthToken()}`,
  },
});

// Actions

export const getAllMedicineOfPharmacy = createAsyncThunk(
  'pharmacy_medicine/fetch_all_medicine_of_pharmacy',
  async () => {
    const res = await axios.get(`${apiUrl}/pharmacy-medicines/`, getConfigs());
    return res.data;
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const getMedicine = createAsyncThunk(
  'pharmacy_medicine/fetch_medicine',
  async medicineId => {
    const res = await axios.get(`${apiUrl}/pharmacy-medicines/${medicineId}`, getConfigs());
    return res.data;
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const createMedicine = createAsyncThunk(
  'pharmacy_medicine/create_medicine',
  async medicine => {
    const res = await axios.post(`${apiUrl}/pharmacy-medicines`, medicine, getConfigs());
    return res.data;
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const updateMedicine = createAsyncThunk(
  'pharmacy_medicine/update_medicine',
  async medicine => {
    const res = await axios.put(
      `${apiUrl}/pharmacy-medicines/${medicine.id}`,
      medicine,
      getConfigs()
    );
    return res.data;
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const deleteMedicine = createAsyncThunk(
  'pharmacy_medicine/delete_medicine',
  async medicineId => {
    const res = await axios.delete(`${apiUrl}/pharmacy-medicines/${medicineId}`, getConfigs());
    return res.data;
  },
  {
    serializeError: serializeAxiosError,
  }
);

// Slice

const pharmacyMedicineSlice = createSlice({
  name: 'pharmacy_medicine',
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllMedicineOfPharmacy.fulfilled, (state, action) => {
        state.loading = false;
        state.medicineList = action.payload;
        state.updateSuccess = null;
      })
      .addCase(getAllMedicineOfPharmacy.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message || 'Internal server error';
        state.updateSuccess = null;
      })
      .addCase(getAllMedicineOfPharmacy.pending, state => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(getMedicine.fulfilled, (state, action) => {
        state.medicine = action.payload;
        state.loading = false;
      })
      .addCase(getMedicine.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message || 'Internal server error';
      })
      .addCase(getMedicine.pending, state => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(createMedicine.fulfilled, (state, action) => {
        state.loading = false;
        state.medicine = action.payload;
        state.updateSuccess = true;
      })
      .addCase(createMedicine.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message || 'Internal server error';
      })
      .addCase(createMedicine.pending, state => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(updateMedicine.fulfilled, (state, action) => {
        state.loading = false;
        state.medicine = action.payload;
        state.updateSuccess = true;
      })
      .addCase(updateMedicine.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message || 'Internal server error';
      })
      .addCase(updateMedicine.pending, state => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(deleteMedicine.fulfilled, state => {
        state.loading = false;
        state.medicine = null;
        state.updateSuccess = true;
      })
      .addCase(deleteMedicine.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message || 'Internal server error';
        state.updateSuccess = false;
      })
      .addCase(deleteMedicine.pending, state => {
        state.loading = true;
        state.errorMessage = null;
      });
  },
});

export const { reset } = pharmacyMedicineSlice.actions;

export default pharmacyMedicineSlice.reducer;
