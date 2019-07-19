import {
  CART_ADD_ITEM,
  CART_GET_CART,
  CART_ADD_QUANTITY,
  CART_SUB_QUANTITY,
  CART_REMOVE_ITEM
} from '../types/cartTypes';

import { IS_LOADING, HAVE_ERROR } from '../types/generalTypes';
const INITIAL_STATE = {
  _id: '',
  cartItems: [],
  is_loading: false,
  total: 0,
  error: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      return {
        ...state,
        cartItems: action.cartItems,
        total: action.total,
        is_loading: false
      };
      
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: action.cartItems,
        total: action.total,
        is_loading: false
      };
      
    case CART_GET_CART:
      return {
        ...state,
        _id: action._id,
        cartItems: action.cartItems,
        total: action.total,
        is_loading: false
      };

    case CART_ADD_QUANTITY:
      return {
        ...state,
        cartItems: action.cartItems,
        total: action.total,
        is_loading: false
      };

    case CART_SUB_QUANTITY:
      return {
        ...state,
        cartItems: action.cartItems,
        total: action.total,
        is_loading: false
      };

    case IS_LOADING:
      return { ...state, is_loading: true };

    case HAVE_ERROR:
      return { ...state, error: action.payload, is_loading: false };

    default:
      return state;
  }
};
