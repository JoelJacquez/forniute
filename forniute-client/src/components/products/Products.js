import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as productsActions from '../../actions/productsActions';
import ProductList from './productList/ProductList';
import './Products.css';
class Products extends Component {

  
  componentDidMount() {
    this.props.getHome();
  
  }

  render() {
    return (
      <div className='products-list'>
        {/* <h1>Products</h1>
        <hr/> */}
          <ProductList />
          
        {/* { this.renderItems() } */}
      </div>
    )
  }
}

const mapStateToProps = ({productsReducer, cartReducer}) => {
  return {
    productsReducer,
    cartReducer
  };
};
export default connect(mapStateToProps, productsActions)(Products);
