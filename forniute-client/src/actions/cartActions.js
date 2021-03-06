import axios from 'axios';
import config from '../config';
import {
  CART_GET_CART,
  CART_ADD_ITEM,
  CART_ADD_QUANTITY,
  CART_REMOVE_ITEM,
  CART_CHECKOUT
} from '../types/cartTypes';
import { IS_LOADING, HAVE_ERROR } from '../types/generalTypes';
import { history } from '../components/general/History';

export const getCart = () => async (dispatch, getState) => {
  dispatch({
    type: IS_LOADING
  });
  const token = getToken();

  try {
    if (!token) {
      history.push('/login');
      return;
    }

    const response = await axios.get(`${config.urlAPI}/cart/`);

    // let cartItems = response.data.data.cartItems;
    const { id, cartItems } = response.data.data;
    let total = 0;
    cartItems.forEach(item => {
      total += item.price * item.quantity;
    });
    setTimeout(() => {
      dispatch({
        type: CART_GET_CART,
        id: id,
        cartItems: cartItems,
        total: total
      });
    }, 1);
  } catch (err) {
    console.log('Error: ', err.message);
    dispatch({
      type: HAVE_ERROR,
      payload: 'Algo ha salido mal, intente mas tarde.'
      // payload: err.message
    });
  }
};

export const addItem = id => async (dispatch, getState) => {
  const token = getToken();

  if (!token) {
    history.push('/login');
    return;
  }

  await axios.post(`${config.urlAPI}/cart/add-item`, {
    productId: id
  });

  dispatch({
    type: CART_ADD_ITEM
  });
};

export const addQuantity = id => async (dispatch, getState) => {
  let { cartItems, total } = getState().cartReducer;
  
  let cartItem = cartItems.find(item => item.id === id);

  await axios.post(`${config.urlAPI}/cart/add-item`, {
    productId: cartItem.productId
  });

  cartItem.quantity += 1;
  let newTotal = total + cartItem.price;
  dispatch({
    type: CART_ADD_QUANTITY,
    cartItems: cartItems,
    total: newTotal
  });
};

export const subQuantity = id => async (dispatch, getState) => {
  let { cartItems, total } = getState().cartReducer;

  let cartItem = cartItems.find(item => item.id === id);
  await axios.put(`${config.urlAPI}/cart/item/${cartItem.id}/subtract`);
  if (cartItem.quantity === 1) {
    let newItems = cartItems.filter(item => item.id !== id);
    let newTotal = total - cartItem.price;
    dispatch({
      type: CART_ADD_QUANTITY,
      cartItems: newItems,
      total: newTotal <= 0 ? 0 : newTotal
    });
  } else {
    cartItem.quantity -= 1;
    let newTotal = total - cartItem.price;
    dispatch({
      type: CART_ADD_QUANTITY,
      cartItems: cartItems,
      total: newTotal
    });
  }
};

export const removeItem = id => async (dispatch, getState) => {
  let { total, cartItems } = getState().cartReducer;
  let itemToRemove = cartItems.find(item => item.id === id);
  let newItems = cartItems.filter(item => item.id !== id);

  await axios.delete(`${config.urlAPI}/cart/item/${itemToRemove.id}`);
  
  let newTotal = total - itemToRemove.price * itemToRemove.quantity;
  
  dispatch({
    type: CART_REMOVE_ITEM,
    cartItems: newItems,
    total: newTotal <= 0 ? 0 : newTotal
  });
};

export const checkout = id => async (dispatch, getState) => {

  let newItems = [];

  await axios.post(`${config.urlAPI}/cart/checkout`);
  
  let newTotal = 0;
  
  dispatch({
    type: CART_CHECKOUT,
    cartItems: newItems,
    total: newTotal
  });
};

const getToken = () => {
  const token = localStorage.getItem(config.tokenName);
  axios.defaults.headers.common = { Authorization: `bearer ${token}` };
  return token;
};
