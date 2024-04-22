import React, { useContext, useEffect } from 'react'; // Import useEffect hook
import ShoppingContext from "../context/shopping/shoppingContext";
import Subtotal from './Subtotal';
import './Checkout.css';
import CheckoutProduct from "./CheckoutProduct";


const Checkout = () => {
    const shoppingContext = useContext(ShoppingContext);
    const { basket, user } = shoppingContext;

    // Log each item in the basket after rendering CheckoutProduct components
    useEffect(() => {
        console.log("Items in basket:", basket);
    }, [basket]); // Log whenever basket changes

    return (
        <div className='checkout'>
            <div className='checkout_left'>
                <img
                    className='checkout_ad'
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR25BKT_nIDX4KRoLBnKP8UHjxvkxB7_pKfUA&s'
                    alt='Image_checkout'
                />
                <div>
                    <h3>Hello, {user?.email}</h3>
                    <h2 className='checkout_title'>Your Shopping Basket</h2>

                    {basket.length > 0 ? (
                        basket.map((item) => (

                            <CheckoutProduct
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))
                    ) : (
                        <p>Your basket is empty.</p>
                    )}
                </div>
            </div>
            <div className='checkout_right'><Subtotal /></div>
        </div>
    );
};

export default Checkout;
