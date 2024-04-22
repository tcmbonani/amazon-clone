import "./App.css";
import React, { useContext,useEffect } from "react";
import { loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import Products from "./Components/Products";
import Header from "./Components/layout/Header";
import Productdetails from "./Components/Productdetails";
import Login from "./Components/login";
import NotFound from "./Components/NotFound";
import ShoppingContext from "./context/shopping/shoppingContext";
import { auth } from "./firebase"
import Checkout from "./Components/Checkout";
import Payment from "./Components/Payment";
import Orders from "./Components/Orders"

const promise  = loadStripe ("pk_test_51P6UpgEaqXayhNaA38bSLcODI7TrCrMRJo4fmyci5npfcJLbonLTRda4OuUWTRIQsZAI27Ass6PfRFNsvJHlRbXo00wq5GUwgf");


const App = () => {
  const shoppingContext = useContext(ShoppingContext);
  const { setUser } = shoppingContext;
  useEffect(() => {
auth.onAuthStateChanged((authUser) => {
  if(authUser){
    setUser(authUser);
  }else {
    setUser(null)
  }
});
  }, []);

  return (
    <>
      <Header />
      <main>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/Home" />
          </Route>
          <Route path="/Home" exact>
            <Home />
          </Route>
          <Route path="/Products">
            <Products />
          </Route>
          <Route path="/Product-details/:id">
            <Productdetails />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/payment">
            <Elements stripe={promise}>
            <Payment />
            </Elements>
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </main>
    </>
  );
};

export default App;
