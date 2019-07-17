import React, { Component } from 'react'
import Products from '../products/Products';

class HomePage extends Component {
  render() {
    return (
      <div className="grid-products">
        <Products />
      </div>
    )
  }
}

export default HomePage
