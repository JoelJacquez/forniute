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
  const state = getState();
  const token = getToken();
  let { products } = state.productsReducer;
  // let { user } = state.authReducer;
  if (!token) {
    history.push('/login');
    return;
  }

  const response = await axios.post(`${config.urlAPI}/cart/add-item`, {
    productId: id
  });
  console.log('====================================');
  console.log('Este es el ptuto response de mierda ', response);
  console.log('====================================');



  dispatch({
    type: CART_ADD_ITEM,
    // cartItems: [...cartItems, cartItem],
    // total: newTotal
  });
  // console.log('====================================');
  // console.log('PORNO XXXd ', id);
  // console.log('====================================');
  // let { cartItems, total } = state.cartReducer;
  // let cartItem = products.find(item => item.id === id);
  // let existed_item = cartItems.find(item => item.productId === id);

  // console.log('====================================');
  // console.log('puto itemS de mierda ', cartItems);
  // console.log('puto item de mierda ', existed_item);
  // console.log('====================================');
  // if (existed_item) {
  //   console.log('====================================');
  //   console.log('Existe el puto item ');
  //   console.log('====================================');
  //   existed_item.quantity += 1;
  //   dispatch({
  //     type: CART_ADD_ITEM,
  //     cartItems: cartItems,
  //     total: total + existed_item.price
  //   });
  // } else {
  //   console.log('====================================');
  //   console.log('Ne existe el puto item de mierda ', cartItem);
  //   console.log('====================================');
    
  // }
};

export const addQuantity = id => (dispatch, getState) => {
  let { cartItems, total } = getState().cartReducer;
  console.log('====================================');
  console.log('Cart items ', cartItems);
  console.log('id ', id);
  console.log('====================================');

  let cartItem = cartItems.find(item => item.id === id);
  cartItem.quantity += 1;
  let newTotal = total + cartItem.price;
  dispatch({
    type: CART_ADD_QUANTITY,
    cartItems: cartItems,
    total: newTotal
  });
};

export const subQuantity = id => (dispatch, getState) => {
  let { cartItems, total } = getState().cartReducer;

  let cartItem = cartItems.find(item => item.id === id);

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

export const removeItem = id => (dispatch, getState) => {
  let { total, cartItems } = getState().cartReducer;
  let itemToRemove = cartItems.find(item => item.id === id);
  let newItems = cartItems.filter(item => item.id !== id);

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
