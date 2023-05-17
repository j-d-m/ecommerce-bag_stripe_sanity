import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

// we are using link in this component to link to the product details page
// we are destructuring the props on the product object
const Products = ({ product: { image, name, slug, price } }) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          {/* receiving then passing the destructured product props to the image element*/}
          <img
            src={urlFor(image && image[0])}
            alt=""
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">€{price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Products;
