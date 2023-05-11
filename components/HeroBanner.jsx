import Link from "next/link";
import React from "react";
import { urlFor } from "../lib/client";

const HeroBanner = ({
  heroBanner: {
    smallText,
    midText,
    largeText1,
    image,
    product,
    buttonText,
    desc,
  },
}) => {
  return (
    <div className="hero-banner-container">
      {/* {console.log(bannerData)} */}
      <div>
        {/* passing dynamic data from the sanity backend*/}
        <p className="beats-solo">{smallText}</p>
        <h3>{midText}</h3>
        <h1>{largeText1}</h1>
        <img
          src={urlFor(image)}
          alt="green over the should sling bag"
          className="hero-banner-image"
        />
        <div>
          {/* LINK in nextjs is the same as an href in react.js - creating a dynamic navigation link to the product */}
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
