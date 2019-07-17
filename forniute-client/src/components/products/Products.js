import React, { Component } from 'react'
import { connect } from 'react-redux';
import Spinner from '../general/Spinner';
import * as productsActions from '../../actions/productsActions';

class Products extends Component {

  
  componentDidMount() {
    this.props.getHome();
  
  }

  renderItems = () => {
    if(this.props.is_loading){
      return (<Spinner />);
    }
    return this.createItems();
    // return (
    //   <div>
    //     {this.createItems()}
    //   </div>
    // );
  }

  createItems = () =>(
    this.props.products.map((product) => (
      <div key={ product.id }>
        <div>
        </div>
        <div>
          <img src="http://lorempixel.com/200/200/cats/" alt={product.name} />
          <h3>{ product.name }</h3>
        </div>
      </div>
    ))
  );

  render() {
    return (
      <div>
        <h1>Products</h1>
        <hr/>
        { this.renderItems() }
      </div>
    )
  }
}

const MAP_STATE_TO_PROPS = (reducers) => {
  return reducers.productsReducer;
};
export default connect(MAP_STATE_TO_PROPS, productsActions)(Products);
