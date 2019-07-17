import { GET_PRODUCTS_HOME } from '../types/productsTypes';
const INITIAL_STATE = {
  products: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PRODUCTS_HOME:
      return { ...state, products: action.payload }
  
    default:
      return state;
  }
}