//import { Route } from "react-router-dom";
import React from "react";
import './Home.css'
import Products from "./Products";

const Home = () => {
  return (
    <div>
      <div className="home">
        <div className="home_container">
          <img
          className="home_image"
            src="https://m.media-amazon.com/images/I/61CiqVTRBEL._SX3000_.jpg"
            alt="hero_image"
          />

<Products />


        </div>
      </div>
    </div>
  );
};

export default Home;
