import React, { useContext, useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import axios from "../axios";
import { Link, useHistory } from "react-router-dom";
import ShoppingContext from "../context/shopping/shoppingContext";
import CheckoutProduct from "./CheckoutProduct";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./Payment.css";
import { db } from "../firebase";

const Payment = () => {
  const shoppingContext = useContext(ShoppingContext);
  const { basket, user, getBasketTotal, emptyBasket } = shoppingContext;

  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(null);
  const [orderDataLog, setOrderDataLog] = useState(null); // New state to store order data log

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const response = await axios.post(
          `/payments/create?total=${getBasketTotal(basket) * 100}`
        );
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
        setError(
          "An error occurred while fetching the client secret. Please try again later."
        );
      }
    };
  
    // Call getClientSecret after the component has mounted
    getClientSecret();
  }, [basket, getBasketTotal, setClientSecret]); // Include setClientSecret in the dependency array
  
  const handlePaymentSuccess = async (orderData) => {
    try {
      await db.collection("users").doc(user?.uid).collection("orders").add(orderData);
      console.log("Order created successfully:", orderData);
      setOrderDataLog(orderData); // Set order data log
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      emptyBasket();
      history.push("/orders");
    } catch (error) {
      console.error("Error creating order:", error);
      setError("An error occurred while creating the order. Please try again later.");
      setProcessing(false);
      setSucceeded(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
  
    if (!clientSecret) {
      setError("Client secret is not available. Please try again later.");
      setProcessing(false);
      return;
    }
  
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
  
    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
      setProcessing(false);
      setSucceeded(false);
    } else {
      // Payment successful, create order
      const orderData = {
        basket: basket,
        amount: payload.paymentIntent.amount,
        created: payload.paymentIntent.created,
      };
      console.log("Order created successfully:", orderData);
      handlePaymentSuccess(orderData);
    }
  };
  

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          {" "}
          Checkout <Link to="/checkout">{basket.length} items </Link>
        </h1>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address </h3>
          </div>
          <div className="payment_address">
            <p>{user?.email}</p>
            <p>145 Bryston upper hills </p>
            <p>Johannesburg South Africa</p>
          </div>
        </div>

        <div className="payment_section">
          <div className="payment_title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment_items">
            {basket.map((item) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method </h3>
          </div>
          <div className="payment_details">
            {/* Stripe code will go here */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment_price_container">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
      {orderDataLog && ( // Display order data log if available
        <div className="order-data-log">
          <h3>Order Data Log:</h3>
          <p>{JSON.stringify(orderDataLog)}</p>
        </div>
      )}
    </div>
  );
};

export default Payment;
