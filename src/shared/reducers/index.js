import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import authentication from './authentication';
import user from './user.reducer';
import product from 'src/pages/ProductPage/product.reducer';
import favorite from 'src/shared/reducers/favorite.reducer';
import userManager from 'src/pages/UserManagerPage/user-manager.reducer';
import cart from 'src/shared/reducers/cart.reducer';

const rootReducer = {
  loadingBar,
  authentication,
  user,
  product,
  favorite,
  userManager,
  cart,
};

export default rootReducer;
