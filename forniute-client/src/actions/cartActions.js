import axios from 'axios';
import config from '../config';
import {
  CART_GET_CART,
  CART_ADD_ITEM,
  CART_ADD_QUANTITY,
  CART_REMOVE_ITEM
} from '../types/cartTypes';
import { IS_LOADING, HAVE_ERROR } from '../types/generalTypes';
import { history } from '../components/general/History';

export const getCart = () => async (dispatch, getState) => {
  dispatch({
    type: IS_LOADING
  });
  const token = getToken();
  console.log('token XXXX', token);
  
  try {
    if (!token) {
      history.push('/login');
      return;
    }


    // const response = await axios.get('http://localhost:9000/v1/cart/');
    const response = await axios.get(`${config.urlAPI}/cart/`);

    console.log('====================================');
    console.log('reposnse ', response);
    console.log('====================================');
    let cartItems = response.data.cartItems;
    const { id } = response.data;
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

export const addItem = _id => (dispatch, getState) => {
  const state = getState();
  let { products } = state.productsReducer;
  let { user } = state.authReducer;
  if (!user) {
    history.push('/login');
    return;
  }
  console.log('====================================');
  console.log('PORNO XXXd');
  console.log('====================================');
  let { cartItems, total } = state.cartReducer;
  let cartItem = products.find(item => item._id === _id);
  let existed_item = cartItems.find(item => item._id === _id);

  if (existed_item) {
    existed_item.quantity += 1;
    dispatch({
      type: CART_ADD_ITEM,
      cartItems: cartItems,
      total: total + existed_item.price
    });
  } else {
    cartItem.quantity = 1;
    //calculating the total
    let newTotal = total + cartItem.price;

    dispatch({
      type: CART_ADD_ITEM,
      cartItems: [...cartItems, cartItem],
      total: newTotal
    });
  }
};

export const addQuantity = _id => (dispatch, getState) => {
  let { cartItems, total } = getState().cartReducer;

  let cartItem = cartItems.find(item => item._id === _id);
  cartItem.quantity += 1;
  let newTotal = total + cartItem.price;
  dispatch({
    type: CART_ADD_QUANTITY,
    cartItems: cartItems,
    total: newTotal
  });
};

export const subQuantity = _id => (dispatch, getState) => {
  let { cartItems, total } = getState().cartReducer;

  let cartItem = cartItems.find(item => item._id === _id);

  if (cartItem.quantity === 1) {
    let newItems = cartItems.filter(item => item._id !== _id);
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

export const removeItem = _id => (dispatch, getState) => {
  let { total, cartItems } = getState().cartReducer;
  let itemToRemove = cartItems.find(item => item._id === _id);
  let newItems = cartItems.filter(item => item._id !== _id);

  //calculating the total
  let newTotal = total - itemToRemove.price * itemToRemove.quantity;
  console.log(itemToRemove);
  dispatch({
    type: CART_REMOVE_ITEM,
    cartItems: newItems,
    total: newTotal <= 0 ? 0 : newTotal
  });
};

const getToken = () => {
  const token = localStorage.getItem(config.tokenName);
  console.log('====================================');
  console.log('tu puta madre pinche token ', token);
  console.log('====================================');
  axios.defaults.headers.common = { Authorization: `bearer ${token}` };
  return token;
};
