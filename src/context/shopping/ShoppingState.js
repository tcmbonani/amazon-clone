import React, { useReducer } from "react"; 
import shoppingContext from "./shoppingContext";
import { shoppingReducer } from "./shoppingReducer";

export const ShoppingState = (props) => {
  const initialState = { basket: [], user: null };
  const [state, dispatch] = useReducer(shoppingReducer, initialState);

//Selectors
const getBasketTotal = (basket) => {
  return basket?.reduce((amount, item) => {
    console.log("Item price:", item.price);
    console.log("Current amount:", amount);
    return (parseFloat(item.price)) + amount;
  }, 0);
};


  const addToBasket = async (item) => {
    dispatch({
      type: "ADD_TO_BASKET",
      payload: item,
    });
  };

  const emptyBasket = () => {
    dispatch({
      type:'EMPTY_BASKET',
    });
  };

  const setUser = (user) => {
    console.log("User payload", user);
    dispatch({
      type: "SET_USER",
      payload: user,
    });
  };

  const removeFromBasket = (item) => {
    dispatch({ type: "REMOVE_FROM_BASKET", payload: item });
  };

  return (
    <shoppingContext.Provider
      value={{
        basket: state.basket,
        user: state.user,
        getBasketTotal,
        addToBasket,
        setUser,
        removeFromBasket,
        emptyBasket,
      }}
    >
      {props.children}
    </shoppingContext.Provider>
  );
};
