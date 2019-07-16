import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Header.css'

class Header extends Component {
  render() {
    return (
      <header>
        <div className="wrapper">
          <Link className="logo" to="/">Forniute</Link>
          <Link className="pull-right" to="/car">Carrito</Link>
          <Link className="pull-right" to="/profile">User</Link>
        </div>
      </header>
    );
  }
}

export default Header