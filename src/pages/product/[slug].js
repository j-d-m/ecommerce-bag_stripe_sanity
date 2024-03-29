// *In this page we are creating a new slug for each product when we navigate to this page. We have named the file [slug].js this gives us a dynamic file name - remember a slug is a unique identifier for each product*/

import React, { useState } from "react";
import { client, urlFor } from "../../../lib/client";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineStar } from "react-icons/ai";
import { Product, StarRating } from "../../../components";
import { useStateContext } from "../../../context/StateContext";
const ProductDetails = ({ product, products }) => {
  // destructing the props of product
  const { image, name, details, price } = product;
  if (!product || !product.image) {
    return <div>Loading...</div>;
  }

  const [index, setIndex] = useState(0);

  const { increaseQuantity, decreaseQuantity, itemCount, onAdd, setShowCart } =
    useStateContext();

  const handleBuyNow = () => {
    onAdd(product, itemCount);
    setShowCart(true);
  };

  return (
    <>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            {image && (
              <img
                src={urlFor(image[index])}
                alt=""
                className="product-detail-image"
              />
            )}
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              //passing a dynamic className to the image
              <img
                src={urlFor(item)}
                key={i}
                alt=""
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <p>Add your rating</p>
          <div className="reviews">
            {/* <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>*/}

            <StarRating />
            <p>(20)</p>
          </div>
          <h4>Details</h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decreaseQuantity}>
                <AiOutlineMinus />{" "}
              </span>
              <span className="num">{itemCount}</span>
              <span className="plus" onClick={increaseQuantity}>
                <AiOutlinePlus />{" "}
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, itemCount)}
            >
              Add to Cart
            </button>
            <button
              type="button"
              className="buy-now"
              onClick={() => {
                handleBuyNow;
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like these products</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
// };

export const getStaticPaths = async () => {
  const query = `*[_type == "product"]
  {slug{current}}`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

// we are destructing the slug params the slug is referring to the files which is dynamic route to what ever specific product is being rendered.

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == "${slug}"][0]`;

  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  {
    /*remember what ever is returned from getStaticProps
    will be populated to our main function via the props
    */
  }
  return {
    props: {
      products,
      product,
    },
  };
};
export default ProductDetails;
