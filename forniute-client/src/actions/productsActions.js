import axios from 'axios';
import { GET_PRODUCTS_HOME } from '../types/productsTypes';
import { IS_LOADING, HAVE_ERROR } from '../types/generalTypes';
export const getHome = () => dispatch => {
  dispatch({
    type: IS_LOADING
  });
  const products = [
    {
      id: 1,
      name: 'Articulo fabuloso 1',
      urlPhoto: 'http://lorempixel.com/200/200/cats/',
      price: 123.45
    },
    {
      id: 2,
      name: 'Articulo fabuloso 2',
      urlPhoto: 'http://lorempixel.com/200/200/cats/',
      price: 123.45
    },
    {
      id: 3,
      name: 'Articulo fabuloso 3',
      urlPhoto: 'http://lorempixel.com/200/200/cats/',
      price: 123.45
    },
    {
      id: 4,
      name: 'Articulo fabuloso 4',
      urlPhoto: 'http://lorempixel.com/200/200/cats/',
      price: 123.45
    },
    {
      id: 5,
      name: 'Articulo fabuloso 5',
      urlPhoto: 'http://lorempixel.com/200/200/cats/',
      price: 123.45
    },
    {
      id: 6,
      name: 'Articulo fabuloso 6',
      urlPhoto: 'http://lorempixel.com/200/200/cats/',
      price: 123.45
    },
    {
      id: 7,
      name: 'Articulo fabuloso 7',
      urlPhoto: 'http://lorempixel.com/200/200/cats/',
      price: 123.45
    },
    {
      id: 8,
      name: 'Articulo fabuloso 8',
      urlPhoto: 'http://lorempixel.com/200/200/cats/',
      price: 123.45
    },
    {
      id: 9,
      name: 'Articulo fabuloso 9',
      urlPhoto: 'http://lorempixel.com/200/200/cats/',
      price: 123.45
    }
  ];
  try {
    setTimeout(() =>{
      dispatch({
        type: GET_PRODUCTS_HOME,
        payload: products
      });
    },1000);
  } catch (err) {
    console.log('Error: ', err.message);
    dispatch({
      type: HAVE_ERROR,
      payload: 'Algo ha salido mal, intente mas tarde.'
      // payload: err.message
    });
  }
};
export const getHomeAPI = () => async dispatch => {
  dispatch({
    type: IS_LOADING
  });

  try {
    const response = await axios.get('https://reqres.in/api/products/');

    dispatch({
      type: GET_PRODUCTS_HOME,
      payload: response.data.data
    });

  } catch (err) {
    console.log('Error: ',err.message);
    dispatch({
      type: HAVE_ERROR,
      payload: 'Algo ha salido mal, intente mas tarde.'
      // payload: err.message
    });
  }
};
