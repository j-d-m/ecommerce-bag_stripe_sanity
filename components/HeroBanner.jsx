import Link from "next/link";
import React from "react";
import { urlFor } from "../lib/client";
// import banner from "../sanity_ecommerce/schemas/banner";

const HeroBanner = ({ heroBanner }) => {
  return (
    <div className="hero-banner-container">
      {/* {console.log(bannerData)} */}
      <div>
        {/* passing dynamic data from the sanity backend*/}
        <p className="beats-solo">smallText</p>
        <h3>MIDTEXT</h3>
        <h1>LARGETEXT</h1>
        <img src="" alt="bag" className="hero-banner-image" />
        <div>
          {/* LINK in nextjs is the same as an href in react.js */}
          <Link href="/product/ID">
            <button type="button">ButtonText</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>DESCRIPTION</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
