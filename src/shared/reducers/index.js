import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import authentication from './authentication';

const rootReducer = {
  loadingBar,
  authentication,
};

export default rootReducer;
