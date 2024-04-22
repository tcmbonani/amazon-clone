import React, { useState, useEffect, useContext } from 'react';
import ShoppingContext from "../context/shopping/shoppingContext";
import { db } from "../firebase";
import "./Orders.css"

const Orders = () => {
  const shoppingContext = useContext(ShoppingContext);
  const { user } = shoppingContext;
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // Fetch the latest order data from Firestore for the current user
        const ordersSnapshot = await db
          .collection("users")
          .doc(user?.uid)
          .collection("orders")
          .orderBy("created", "desc") // Order by creation date in descending order to get the latest order first
          .limit(1) // Limit the result to only one document (the latest order)
          .get();

        // Check if any orders were found
        if (!ordersSnapshot.empty) {
          // Extract the latest order data
          const latestOrderData = ordersSnapshot.docs[0].data();
          
          // Set the latest order in state
          setOrder(latestOrderData);
          
          // Log the latest order
          console.log("Latest order:", latestOrderData);
        } else {
          console.log("No orders found.");
        }
      } catch (error) {
        console.error("Error fetching latest order:", error);
      }
    };

    // Call fetchOrder when the component mounts or when the user changes
    fetchOrder();
  }, [user]); // Add user to the dependency array to refetch the latest order when the user changes

  return (
    <div className='orders-container'>
      <h1>Your Order</h1>
      {order ? (
        <div className='order'>
          <p className='order-id'>Order ID: {order.created}</p>
          <p className='order-total'>Total: {order.amount}</p>
          <div className="basket-items">
            <h2>Basket Items:</h2>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>
                  <img src={item.image} alt={item.title} />
                  <div>
                    <p>{item.title}</p>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* Render other order details here */}
        </div>
      ) : (
        <p className='no-orders'>No orders found.</p>
      )}
    </div>
  );
};

export default Orders;
