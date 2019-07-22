import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as cartActions from '../../actions/cartActions';
import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';
import CartItem from '../cart/CartItem';
import './styles/CartPage.css';

class CarPage extends Component {

  
  renderItems() {
    const { cartItems } = this.props.cartReducer;
    if (this.props.cartReducer.isLoading) {
      return <Spinner />;
    }
    if (this.props.error) {
      return <Fatal message={this.props.cartReducer.error} />;
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
        <CartItem key={item.id} item={item} {...this.props} />
      ));
    }
    return cartItemsRender;
  }

  handleCheckout() {
    this.props.checkout();
  }

  componentDidMount() {
    if (!this.props.id) {
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
            <span className="cart-total-ammount">
              ${this.props.cartReducer.total.toFixed(2)}{' '}
            </span>
          </div>
          <button className="checkout-btn" onClick={() => {this.handleCheckout()}}>CHECKOUT</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ cartReducer, authReducer }) => {
  return {
    authReducer,
    cartReducer
  };
};

export default connect(
  mapStateToProps,
  cartActions
)(CarPage);
