import axios from 'axios';
import jwt from 'jsonwebtoken';
import config from '../config';
import { history } from '../components/general/History';
import {
  IS_LOADING,
  HAVE_ERROR,
  LOGIN,
  LOGOUT,
  GET_USER
} from '../types/authTypes';

export const login = (email, password) => async dispatch => {
  dispatch({
    type: IS_LOADING
  });

  try {
    const credentials = btoa(email + ':' + password);
    console.log('Credentials ', credentials);

    const response = await axios.post(
      `${config.urlAPI}/auth/token/`,
      {},
      {
        headers: {
          Authorization: 'Basic ' + credentials
        }
      }
    );
    const token = response.data.access_token;
    localStorage.setItem(config.tokenName, token);
    const user = getUserFrom(token);

    console.log('History length ', history.length);
    // if(history.length>2) {
    //   history.goBack();
    // }else{
    // }
    history.push('/');

    dispatch({
      type: LOGIN,
      token,
      user,
      error: ''
    });
  } catch (err) {
    console.log('Error porno: ', err.message);
    dispatch({
      type: HAVE_ERROR,
      payload: 'Email o contraseña son incorrectos'
      // payload: err.message
    });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem(config.tokenName);
  dispatch({
    type: LOGOUT,
    user: null,
    token: ''
  });
};

export const getUser = () => dispatch => {
  if (!isExpired()) {
    const token = localStorage.getItem(config.tokenName);
    const user = getUserFrom(token);

    dispatch({
      type: GET_USER,
      user
    });
  } else {
    dispatch({
      type: GET_USER,
      user: null
    });
  }
};

const isExpired = () => {
  let expired = false;
  const token = localStorage.getItem(config.tokenName);
  if (!token) {
    return true;
  }
  const { exp } = jwt.decode(token);

  if (Date.now() >= exp * 1000) {
    expired = true;
  }

  return expired;
};

const getUserFrom = token => {
  const { email } = jwt.decode(token);
  const user = {
    email
  };
  return user;
};
