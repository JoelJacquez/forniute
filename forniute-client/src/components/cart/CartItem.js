import React, { Component } from 'react';
import './styles/CartItem.css';
class CartItem extends Component {
  
  handleClickAddQuantity(_id) {
    this.props.addQuantity(_id);
  }
  handleClickSubQuantity(_id) {
    this.props.subQuantity(_id);
  }
  handleClickRemoveItem(_id) {
    this.props.removeItem(_id);
  }

  render() {
    const { item } = this.props;
    return (
      <div className="cart-item">
        <div className="item-img">
          <img src={item.urlPhoto} alt={item.name} />
        </div>

        <div className="item-resume">
          <span className="item-name"> {item.name} </span>
          <p>{item.description}</p>
          <p className="item-price">
            <b>Precio: </b>${item.price}
          </p>
          <p>
            <b>Cantidad: </b>
            <button
              className="circular-button"
              onClick={() => {
                this.handleClickSubQuantity(item._id);
              }}
            >
              -
            </button>
            <span className="item-quantity">{item.quantity}</span>
            <button
              className="circular-button"
              onClick={() => {
                this.handleClickAddQuantity(item._id);
              }}
            >
              +
            </button>
          </p>
          <button
            onClick={() => {
              this.handleClickRemoveItem(item._id);
            }}
          >
            remover
          </button>
        </div>
      </div>
    );
  }
}

export default CartItem;
