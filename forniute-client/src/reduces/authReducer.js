import {
  IS_LOADING,
  HAVE_ERROR,
  LOGIN,
  LOGOUT,
  GET_USER
} from '../types/authTypes';

const INITIAL_STATE = {
  token: '',
  user: null,
  isLoading: false,
  error: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.token,
        user: action.user,
        error: '',
        isLoading: false
      };

    case LOGOUT:
      return {
        ...state,
        token: action.token,
        user: action.user,
        isLoading: false
      };

    case GET_USER:
      return {
        ...state,
        user: action.user
      };

    case IS_LOADING:
      return { ...state, isLoading: true };
    case HAVE_ERROR:
      return { ...state, error: action.payload, isLoading: false };

    default:
      return state;
  }
};
