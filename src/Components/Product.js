import React, { useContext } from "react";
import "./Products.css";
import ShoppingContext from "../context/shopping/shoppingContext";

const Product = ({ id, image, title, rating, price }) => {
  const shoppingContext = useContext(ShoppingContext);
  const { addToBasket } = shoppingContext;

  const addToBaskethandler = () => {
    console.log("Adding to basket:", { id, image, title, rating, price });
    addToBasket({ id, image, title, rating, price });
  };

  return (
    <div className="product" key={id}>
      <img className="product_image" src={image} alt={title} />
      <div className="product_info">
        <p className="product_title">{title}</p>
        <div className="product_rating">
          <p>{"⭐".repeat(rating)}</p>
        </div>
        <p className="product_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
      </div>
      <button className="product_button" onClick={addToBaskethandler}>
        Add to Basket
      </button>
    </div>
  );
};

export default Product;
