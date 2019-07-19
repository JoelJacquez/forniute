import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authActions from '../../../actions/authActions';
import './Header.css';

class Header extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  renderSpecialLinks() {
    if (this.props.user) {
      return [
        <Link key="1" className="menu-item pull-right" to="/login">
          Cerrar session
        </Link>,
        <span key="2" className="pull-right" style={{margin:'15px'}}>
          {this.props.user.email}
        </span>
      ];
    } else {
      return (
        <Link className="menu-item pull-right" to="/login">
          Login
        </Link>
      );
    }
  }

  render() {
    return (
      <header>
        <div className="wrapper">
          <Link className="logo" to="/">
            Forniute
          </Link>
          <Link className="menu-item pull-right" to="/car">
            <i className="fas fa-shopping-cart" />
          </Link>

          {this.renderSpecialLinks()}
        </div>
      </header>
    );
  }
}
const setStateToProps = reducers => {
  return reducers.authReducer;
};
export default connect(
  setStateToProps,
  authActions
)(Header);
