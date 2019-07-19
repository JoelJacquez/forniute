import { GET_PRODUCTS_HOME } from '../types/productsTypes';
import { IS_LOADING, HAVE_ERROR } from '../types/generalTypes';
const INITIAL_STATE = {
  products: [],
  isLoading: false,
  error: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PRODUCTS_HOME:
      return { 
        ...state, 
        products: action.payload,
        isLoading: false
      }
    
    case IS_LOADING:
      return { ...state, isLoading: true}
    case HAVE_ERROR:
      return { ...state, error: action.payload, isLoading: false}

    default:
      return state;
  }
}