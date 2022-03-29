import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import authentication from './authentication';
import admin from 'src/pages/AdminModule/admin.reducer';
import bookingDoctor from 'src/pages/DoctorBookingModule/booking.reducer';
import message from 'src/pages/MessageModule/message.reducer';
import bookingManager from 'src/pages/BookingManagerModule/bookingManager.reducer';

const rootReducer = {
  loadingBar,
  authentication,
  admin,
  bookingDoctor,
  message,
  bookingManager,
};

export default rootReducer;
