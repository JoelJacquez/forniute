import React from 'react';
import './styles/ProductItem.css';
const ProductItem = props => {
  const { product, handleClick } = props;
  return (
    <div className="product-item">
      <div>
        <img src={product.urlPhoto} alt={product.name} />
      </div>
      <div className="info">
        <button onClick={ () => { handleClick(product) } }>
          <i className="fas fa-cart-plus" />
        </button>
        <span className="item-name">{product.name}</span>
        <span className="item-price">{product.price}</span>
      </div>
    </div>
  );
};

export default ProductItem;
