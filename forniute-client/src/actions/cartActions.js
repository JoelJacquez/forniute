// import axios from 'axios';
import {
  CART_GET_CART,
  CART_ADD_ITEM,
  CART_ADD_QUANTITY,
  CART_REMOVE_ITEM
} from '../types/cartTypes';
import { IS_LOADING, HAVE_ERROR } from '../types/generalTypes';

const allcartItems = [
  {
    _id: '5d30453d712602623c55dea2',
    name: 'Verpro Smart Watch1',
    urlPhoto:
      'https://images-na.ssl-images-amazon.com/images/I/71s9AZwrcmL._SL1500_.jpg',
    price: 1168,
    quantity: 1
  },
  {
    _id: '5d30453d712602623c55dea3',
    name: 'Alfawise Y7',
    urlPhoto:
      'https://gloimg.gbtcdn.com/soa/gb/pdm-product-pic/Electronic/2018/12/06/source-img/20181206153014_63896.jpg',
    price: 519.56,
    quantity: 1
  },
  {
    _id: '5d30453d712602623c55dea4',
    name: 'ColMi Bluetooth Smartwatch',
    urlPhoto:
      'https://ae01.alicdn.com/kf/HTB1ib1BSpXXXXcuXVXXq6xXFXXXL/Pulsera-de-ritmo-card-aco-ColMi-Bluetooth-Smartwatch-con-Monitor-de-presi-n-arterial-rastreador-de.jpg',
    price: 951.65,
    quantity: 1
  },
  {
    _id: '5d30453d712602623c55dea5',
    name: 'Gocomma B2',
    urlPhoto:
      'https://gloimg.gbtcdn.com/soa/gb/pdm-product-pic/Electronic/2019/03/20/source-img/20190320141940_72963.jpg',
    price: 338.33,
    quantity: 1
  }
];

export const getCart = () => dispatch => {
  dispatch({
    type: IS_LOADING
  });

  try {
    // const response = await axios.get('http://localhost:9000/v1/cart/');
    let cartItems = [allcartItems[0]];
    let total = 0;
    cartItems.forEach(item => {
      total += item.price * item.quantity;
    });
    setTimeout(() => {
      dispatch({
        type: CART_GET_CART,
        _id: 'sj982i3982ube83294r2309fu0ed',
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
