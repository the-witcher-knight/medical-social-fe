import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { StorageAPI } from 'src/shared/util/storage-util';

const API_URL = process.env.API_URL;
const getAuthToken = () => StorageAPI.local.get('authToken') || StorageAPI.session.get('authToken');

const initialState = {
  loading: false,
  errorMessage: null,
  messageList: [],
  chatRoomList: [],
  selectedChatRoom: null,
};

// Actions

export const getAllChatRoom = createAsyncThunk('message/get_all_chat_room', async () => {
  const res = await axios.get(`${API_URL}/admin/chatroom`, {
    headers: { Authorization: `Bearer ${getAuthToken()}` },
  });
  return res.data;
});

// Slice

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setSelectedChatRoom(state, action) {
      state.selectedChatRoom = action.payload;
    },
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllChatRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.chatRoomList = action.payload;
      })
      .addCase(getAllChatRoom.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message || 'Internal Server Error';
      })
      .addCase(getAllChatRoom.pending, state => {
        state.loading = true;
        state.errorMessage = null;
      });
  },
});

export const { setSelectedChatRoom, reset } = messageSlice.actions;

export default messageSlice.reducer;
