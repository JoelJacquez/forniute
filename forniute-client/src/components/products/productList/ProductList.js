import React from 'react';
import { connect } from 'react-redux';
import ProductItem from '../productItem/ProductItem';
import Spinner from '../../general/spinner/Spinner';
import Fatal from '../../general/fatal/Fatal';

const ProductList = (props) => {
  const { products } = props;

  const createItems = () => products.map((item) => (
    <ProductItem key={item.id} product={item}/>
    // <div className="box" >{ item.name }</div>
  ))
  const renderItems = () => {
    if(props.is_loading){
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
const mapStateToProps = (reducers) => {
  return reducers.productsReducer;
};
export default connect(mapStateToProps)(ProductList);
