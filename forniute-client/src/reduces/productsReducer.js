import { GET_PRODUCTS_HOME } from '../types/productsTypes';
import { IS_LOADING, HAVE_ERROR } from '../types/generalTypes';
const INITIAL_STATE = {
  products: [],
  is_loading: false,
  error: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PRODUCTS_HOME:
      return { 
        ...state, 
        products: action.payload,
        is_loading: false
      }
    
    case IS_LOADING:
      return { ...state, is_loading: true}
    case HAVE_ERROR:
      return { ...state, error: action.payload, is_loading: false}

    default:
      return state;
  }
}