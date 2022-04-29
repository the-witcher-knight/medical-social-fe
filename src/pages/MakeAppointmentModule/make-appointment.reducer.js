import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { AuthorityConstant } from 'src/shared/authority-constant';
import { serializeAxiosError } from 'src/shared/reducers/reducer.utils';
import { getAuthToken } from 'src/shared/util/auth-util';

const API_URL = process.env.API_URL;

const initialState = {
  loading: false,
  errorMessage: null,
  bookingCompleted: null,
  doctorList: [], // Active doctor list
  scheduleList: [], // Schedule list of doctor {id}
  chatRoomList: [],
  createdChatRoom: null,
};

// Actions

/**
 * Get doctor list
 * @param {number} page - number of page
 * @param {number} size - size of page
 */
export const getDoctors = createAsyncThunk(
  'make_appointment/fetch_doctor_list',
  async (page, size) => {
    const res = await axios.get(`${API_URL}/admin/users/authority/${AuthorityConstant.DOCTOR}`, {
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

/**
 * get degree of doctor. Don't store in state
 * @param {number} doctorId
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getDegreeDoctor = createAsyncThunk(
  'make_appointment/fetch_degree_doctor',
  async doctorId => {
    const res = await axios.get(`${API_URL}/admin/users/degree/${doctorId}`);
    return res;
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const getAllChatRoom = createAsyncThunk(
  'make_appointment/fetch_all_chat_room',
  async () => {
    const res = await axios.get(`${API_URL}/admin/chatroom`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    });
    return res.data;
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const createChatRoom = createAsyncThunk(
  'make_appointment/create_chat_room',
  async doctorId => {
    const res = await axios.post(
      `${API_URL}/chat-rooms/doctor/${doctorId}`,
      {},
      {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      }
    );
    return res.data;
  },
  {
    serializeError: serializeAxiosError,
  }
);

/**
 * Get schedule of doctor at date
 * @param {number} doctorId
 * @param {string} date
 */
export const getScheduleOfDoctorAtDate = createAsyncThunk(
  'make_appointment/fetch_schedule_of_doctor_at_date',
  // pass only one param here. Because of redux-thunk
  async ({ doctorId, date }) => {
    const res = await axios.get(`${API_URL}/examination-schedules/doctor/${doctorId}`, {
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

export const createDoctorSchedule = createAsyncThunk(
  'make_appointment/create_doctor_schedule',
  async schedule => {
    const res = await axios.post(`${API_URL}/examination-schedules`, schedule);
    return res.data;
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const getAllScheduleOfUser = createAsyncThunk(
  'make_appointment/fetch_all_schedule_of_user',
  async ({ userLogin, date }) => {
    const res = await axios.get(`${API_URL}/examination-schedules/user/login/${userLogin}`, {
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

// Slice

const makeAppointmentSlice = createSlice({
  name: 'make_appointment',
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
    resetBookingCompleted(state) {
      state.bookingCompleted = null;
    },
    resetCreatedChatRoom(state) {
      state.createdChatRoom = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getDoctors.fulfilled, (state, action) => {
        state.doctorList = action.payload;
        state.loading = false;
      })
      .addCase(getDoctors.rejected, (state, action) => {
        state.errorMessage = action.error.message || 'Something went wrong';
        state.loading = false;
      })
      .addCase(getDoctors.pending, state => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(getScheduleOfDoctorAtDate.fulfilled, (state, action) => {
        state.scheduleList = action.payload;
        state.loading = false;
      })
      .addCase(getScheduleOfDoctorAtDate.rejected, (state, action) => {
        state.errorMessage = action.error.message || 'Something went wrong';
        state.loading = false;
      })
      .addCase(getScheduleOfDoctorAtDate.pending, state => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(createDoctorSchedule.fulfilled, state => {
        state.loading = false;
        state.bookingCompleted = true;
      })
      .addCase(createDoctorSchedule.rejected, (state, action) => {
        state.errorMessage = action.error.message || 'Something went wrong';
        state.loading = false;
        state.bookingCompleted = false;
      })
      .addCase(createDoctorSchedule.pending, state => {
        state.loading = true;
        state.errorMessage = null;
        state.bookingCompleted = null;
      })
      .addCase(getAllChatRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.chatRoomList = action.payload;
      })
      .addCase(getAllChatRoom.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message || 'Internal server error';
      })
      .addCase(getAllChatRoom.pending, state => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(createChatRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.createdChatRoom = action.payload;
      })
      .addCase(createChatRoom.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message || 'Internal server error';
      })
      .addCase(createChatRoom.pending, state => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(getAllScheduleOfUser.fulfilled, (state, action) => {
        state.loading = false;
        state.scheduleList = action.payload;
      })
      .addCase(getAllScheduleOfUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message || 'Internal server error';
      })
      .addCase(getAllScheduleOfUser.pending, state => {
        state.loading = true;
        state.errorMessage = null;
      });
  },
});

export const { reset, resetBookingCompleted, resetCreatedChatRoom } = makeAppointmentSlice.actions;

export default makeAppointmentSlice.reducer;
