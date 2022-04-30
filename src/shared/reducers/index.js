import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import authentication from './authentication';
import admin from 'src/pages/AdminModule/admin.reducer';
import message from 'src/pages/MessageModule/message.reducer';
import pharmacyMedicine from 'src/pages/MedicineModule/pharmacy-medicine.reducer';
import scheduleManager from 'src/pages/ScheduleManagerModule/schedule-manager.reducer';
import makeAppointment from 'src/pages/MakeAppointmentModule/make-appointment.reducer';

const rootReducer = {
  loadingBar,
  scheduleManager,
  makeAppointment,
  pharmacyMedicine,
  authentication,
  admin,
  message,
};

export default rootReducer;
