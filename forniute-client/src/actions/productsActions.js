import axios from 'axios';
import { GET_PRODUCTS_HOME } from '../types/productsTypes';
import { IS_LOADING, HAVE_ERROR } from '../types/generalTypes';
export const getHome = () => async dispatch => {
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
