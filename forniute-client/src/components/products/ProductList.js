import React from 'react';
import { connect } from 'react-redux';
import * as cartActions from '../../actions/cartActions';
import ProductItem from './ProductItem';
import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';

const ProductList = (props) => {
  const { products } = props.productsReducer;
  const handleClick = (product) => {
    console.log('Click on product ', product);
    props.addItem(product.id);
  }
  const createItems = () => products.map((item) => (
    <ProductItem key={item.id} product={item} handleClick={handleClick} />
  ))
  const renderItems = () => {
    
    if(props.isLoading){
      return (<Spinner />);
    }
    if(props.error) {
      return <Fatal message={props.error} />;
    }
    return (
      <div className="home-products-grid">
        { createItems() }
      </div>
    );
  }
  
  return (
    renderItems()
  )
}
const mapStateToProps = ({productsReducer, cartReducer}) => {
  return {
    productsReducer, 
    cartReducer
  };
};
export default connect(mapStateToProps, cartActions)(ProductList);
