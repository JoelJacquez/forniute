import  { combineReducers } from 'redux';
import profileReducer from './profileReducer'
import productsReducer from './productsReducer'
import cartReducer from './cartReducer';
export default combineReducers({
  profileReducer,
  productsReducer,
  cartReducer,
});