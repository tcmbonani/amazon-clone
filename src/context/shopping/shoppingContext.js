import React, { createContext, useReducer } from "react";


const initialState = {
    basket: [],
  };
  
  // Reducer
  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_BASKET":
        return {
          ...state,
          basket: [...state.basket, action.payload.item],
        };
      default:
        return state;
    }
  };
  
  // Create context
  const ShoppingContext = createContext();
  
  // Context provider
  export const ShoppingProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
  
    const addToBasket = (item) => {
      dispatch({ type: "ADD_TO_BASKET", payload: { item } });
    };
  
    return (
      <ShoppingContext.Provider value={{ ...state, addToBasket }}>
        {children}
      </ShoppingContext.Provider>
    );
  };
  
const shoppingContext = createContext();

export default shoppingContext; 
