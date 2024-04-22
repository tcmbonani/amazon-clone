import React from "react";
import "./Product.css";
import Product from "./Product";
//import {Link} from 'react-router-dom'

const products = () => {
  return (
    <>
     <div className="product_row">
      <Product
        id="1"
        title="HORI Nintendo Switch Split Pad Compact (Gengar) - 
        Ergonomic Controller for Handheld Mode  - Officially Licensed by Nintendo & Pokémon"
        image="https://m.media-amazon.com/images/I/71myeEIe8NL._AC_UY327_FMwebp_QL65_.jpg"
        rating="4"
        price="59.99"
      />
     <Product
        id="450166660"
        title="Redragon S101 Gaming Keyboard, M601 Mouse, RGB Backlit Gaming Keyboard, 
        Programmable Backlit Gaming Mouse, Value Combo Set [New Version]"
        image="https://m.media-amazon.com/images/I/71QDJHG1PqL._AC_UY327_FMwebp_QL65_.jpg"
        rating="5"
        price="39.50"
      />
    </div> 

    <div className="product_row">
    <Product
        id="1658785dj"
        title="Razer BlackShark V2 X Gaming Headset: 7.1 Surround Sound - 50mm Drivers -
         Memory Foam Cushion - for PC, Mac, PS4, PS5, Switch - 3.5mm Audio Jack - White"
        image="https://m.media-amazon.com/images/I/71MGiPTwXAL._AC_UY327_FMwebp_QL65_.jpg"
        rating="3"
        price="29.99"
      />
     <Product
        id="459955440"
        title="Google Pixel 7a - Unlocked Android Cell Phone - Smartphone with Wide Angle Lens and 24-Hour Battery - 128 GB – Charcoal"
        image="https://m.media-amazon.com/images/I/41lbLgxdBWL._AC_UF226,226_FMjpg_.jpg"
        rating="5"
        price="15.50"
      />
       <Product
        id="45956j440"
        title="IdeaPad Laptop, 15.6 FHD Display, AMD Ryzen 3 7320U Processor (Beat i5-1035G7), 
        8GB DDR5 RAM, 512GB SSD, Wi-Fi 6, SD Card Reader, HDMI, USB A&C, Webcam, Windows 11,"
        image="https://m.media-amazon.com/images/I/71KidMVm09L._AC_UY327_FMwebp_QL65_.jpg"
        rating="2"
        price="105.50"
      />

    </div>

    <div className="product_row">

    <Product
        id="4595gdhd4544"
        title="Alienware Aurora R15 Gaming Desktop - 
        AMD Ryzen 9 7900X, 32GB DDR5 RAM, 1TB SSD + 2TB HDD, NVIDIA GeForce RTX 4080 16GB GDDR6X, 
        Dell Service Included, Windows 11 Home - Black"
        image="https://m.media-amazon.com/images/I/610xQwj-q7L._AC_SX679_.jpg"
        rating="5"
        price="255.50"
      />


    </div>
    </>
   
  );
};

export default products;
