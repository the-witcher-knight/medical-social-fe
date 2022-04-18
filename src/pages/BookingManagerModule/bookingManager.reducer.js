import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { serializeAxiosError } from 'src/shared/reducers/reducer.utils';

const API_URL = process.env.API_URL;

const initialState = {
  loading: false,
  scheduleList: [],
  schedule: null, // Or schedule data
  patient: null,
  errorMessage: null,
  selectedSchedule: null,
  dialogData: null, // { action: 'delete'||'confirm', title: ''}
  dialogOpen: false,
};

// Actions

/**
 * Get schedule of doctor at date
 * @param {login: string, date: string} params
 */
export const getScheduleByDoctorLoginAtDate = createAsyncThunk(
  'booking_manager/fetch_schedule_by_doctor_login_at_date',
  // pass only one param here. Because of redux-thunk
  async ({ login, date }) => {
    const res = await axios.get(`${API_URL}/examination-schedules/doctor/login/${login}`, {
      params: {
        date,
      },
    });
    return res.data;
  },
  {
    serializeError: serializeAxiosError,
  }
);

/**
 * Update schedule
 * @param {id: number, status: string} params
 */
export const partialUpdateSchedule = createAsyncThunk(
  'booking_manager/confirm_schedule',
  async schedule => {
    const res = await axios.patch(`${API_URL}/examination-schedules/${schedule.id}`, schedule);
    return res.data;
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const getPatientById = createAsyncThunk(
  'booking_manager/fetch_patient_by_id',
  async id => {
    const res = await axios.get(`${API_URL}/admin/users/id/${id}`);
    return res.data;
  },
  {
    serializeError: serializeAxiosError,
  }
);

// Slice

const doctorBookingSlice = createSlice({
  name: 'booking_manager',
  initialState,
  reducers: {
    openModal(state, action) {
      state.dialogOpen = true;
      state.dialogData = action.payload;
    },
    closeModal(state) {
      state.dialogOpen = false;
      state.dialogData = null;
    },
    setSelectedSchedule(state, action) {
      state.selectedSchedule = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getScheduleByDoctorLoginAtDate.fulfilled, (state, action) => {
        state.loading = false;
        state.scheduleList = action.payload;
      })
      .addCase(getScheduleByDoctorLoginAtDate.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message || 'Internal server error';
      })
      .addCase(getScheduleByDoctorLoginAtDate.pending, state => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(partialUpdateSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.scheduleList = state.scheduleList.map(schedule => {
          if (schedule.id === action.payload.id) {
            return action.payload;
          }
          return schedule;
        });
      })
      .addCase(partialUpdateSchedule.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message || 'Internal server error';
      })
      .addCase(partialUpdateSchedule.pending, state => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(getPatientById.fulfilled, (state, action) => {
        state.loading = false;
        state.patient = action.payload;
      })
      .addCase(getPatientById.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message || 'Internal server error';
      })
      .addCase(getPatientById.pending, state => {
        state.loading = true;
        state.errorMessage = null;
      });
  },
});

export const { openModal, closeModal, setSelectedSchedule } = doctorBookingSlice.actions;

export default doctorBookingSlice.reducer;
