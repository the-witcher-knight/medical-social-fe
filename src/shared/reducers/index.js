import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import authentication from './authentication';
import admin from 'src/pages/AdminModule/admin.reducer';
import bookingDoctor from 'src/pages/DoctorBookingModule/booking.reducer';

const rootReducer = {
  loadingBar,
  authentication,
  admin,
  bookingDoctor,
};

export default rootReducer;
