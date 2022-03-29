import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import authentication from './authentication';
import admin from 'src/pages/AdminModule/admin.reducer';
import bookingDoctor from 'src/pages/DoctorBookingModule/booking.reducer';
import message from 'src/pages/MessageModule/message.reducer';

const rootReducer = {
  loadingBar,
  authentication,
  admin,
  bookingDoctor,
  message,
};

export default rootReducer;
