import axios from 'axios';
import { GET_PRODUCTS_HOME } from '../types/productsTypes';
export const getHome = () => async (dispatch) => {
    const response = await axios.get('https://reqres.in/api/products/');
    
  dispatch({
    type: GET_PRODUCTS_HOME,
    payload: response.data.data
  })
}