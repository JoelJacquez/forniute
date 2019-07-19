import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import config from '../../config';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem(config.tokenName) ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )
    }
  />
);


export default PrivateRoute
