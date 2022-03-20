import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import authentication from './authentication';
import admin from 'src/pages/AdminModule/admin.reducer';

const rootReducer = {
  loadingBar,
  authentication,
  admin,
};

export default rootReducer;
