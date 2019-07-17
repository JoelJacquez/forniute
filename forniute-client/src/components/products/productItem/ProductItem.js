import React from 'react'
import './ProductItem.css';
const ProductItem = (props) => {
  const { product } =props;
  return (
    <div className="product-item">
      <div>
        <img src={product.urlPhoto} alt={product.name} />
      </div>
      <div className="info">
        <button>
        <i className="fas fa-cart-plus"></i>
        </button>
        <span className="item-name">{ product.name }</span>
        <span className="item-price">{ product.price }</span>
      </div>
    </div>
  )
}

export default ProductItem
