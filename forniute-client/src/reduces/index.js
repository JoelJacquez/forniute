import  { combineReducers } from 'redux';
import profileReducer from './profileReducer'
import productsReducer from './productsReducer'
import cartReducer from './cartReducer';
import authReducer from './authReducer';
export default combineReducers({
  profileReducer,
  productsReducer,
  cartReducer,
  authReducer,
});