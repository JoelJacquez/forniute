import  { combineReducers } from 'redux';
import profileReducer from './profileReducer'
import productsReducer from './productsReducer'
export default combineReducers({
  profileReducer,
  productsReducer,
});