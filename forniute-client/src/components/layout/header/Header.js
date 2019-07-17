import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Header.css'

class Header extends Component {
  render() {
    return (
      <header>
        <div className="wrapper">
          <Link className="logo" to="/">Forniute</Link>
          <Link className="menu-item pull-right" to="/car">
            <i className="fas fa-shopping-cart"></i>
          </Link>
          <Link className="menu-item pull-right" to="/profile">Profile</Link>
        </div>
      </header>
    );
  }
}

export default Header