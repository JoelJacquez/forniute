import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as cartActions from '../../actions/cartActions';
import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';
import CartItem from '../cart/CartItem';
import './styles/CartPage.css';

class CarPage extends Component {
  renderItems() {
    const { cartItems } = this.props;
    if (this.props.isLoading) {
      return <Spinner />;
    }
    if (this.props.error) {
      return <Fatal message={this.props.error} />;
    }
    let cartItemsRender = [];
    if (cartItems.length === 0) {
      cartItemsRender.push(
        <div key="1" className="cart-item-empty">
          No hay articulos agregados
        </div>
      );
    } else {
      cartItemsRender = cartItems.map(item => (
        <CartItem key={item._id} item={item} {...this.props} />
      ));
    }
    return cartItemsRender;
  }

  

  componentDidMount() {
    console.log('====================================');
    console.log(this.props);
    console.log('====================================');
    if (!this.props._id) {
      console.log('require load data cart');
      this.props.getCart();
    }
  }

  render() {
    return (
      <div className="cart-page-container">
        <h1>Tu articulos:</h1>
        <div className="cart-items-container">{this.renderItems()}</div>
        <div className="cart-resume-container">
          <div className="cart-sumary-container">
            <span className="cart-total-label">Total: </span>
            <span className="cart-total-ammount">${this.props.total.toFixed(2)} </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reducers => {
  return reducers.cartReducer;
};

export default connect(
  mapStateToProps,
  cartActions
)(CarPage);
