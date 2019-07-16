import React, { Component } from 'react';
import './Header.css'

class Header extends Component {
  render() {
    return (
      <header>
        <div className="wrapper">
          <a className="logo" href="/">Forniute</a>
          <a className="pull-right" href="/">Carrito</a>
          <a className="pull-right" href="/">User</a>
        </div>
      </header>
    );
  }
}

export default Header