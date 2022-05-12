import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import authentication from './authentication';
import userManager from 'src/pages/UserManagerModule/user-manager.reducer';
import message from 'src/pages/MessageModule/message.reducer';
import pharmacyMedicine from 'src/pages/MedicineModule/pharmacy-medicine.reducer';
import scheduleManager from 'src/pages/ScheduleManagerModule/schedule-manager.reducer';
import makeAppointment from 'src/pages/MakeAppointmentModule/make-appointment.reducer';
import prescriptionManager from 'src/pages/PrescriptionManagerModule/prescription-manager.reducer';
import pharmacyView from 'src/pages/PharmacyViewModule/pharmacy-view.reducer';

const rootReducer = {
  loadingBar,
  scheduleManager,
  makeAppointment,
  pharmacyMedicine,
  authentication,
  userManager,
  message,
  prescriptionManager,
  pharmacyView,
};

export default rootReducer;
