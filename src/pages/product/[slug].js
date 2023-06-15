// *In this page we are creating a new slug for each product when we navigate to this page. We have named the file [slug].js this gives us a dynamic file name - remember a slug is a unique identifier for each product*/
//**!DYNAMIC ROUTES
//**when you don't know the exact segment names and want to create routes from dynamic data, use dynamic segments they will be filled at request time. - an Example: Route/file structure - pages/product/[slug] === url  /products/a - the params are {slug: "a"}*/
//**! Convention
//**  A Dynamic Segment file naming  convention is [folderName] Dynamic Routes can be accessed from the useRouter hook if need be you can use a catch-all segment by using the spread operator on the file name [...folderName] for example, pages/product/[..slug].js will match /product/a but also will match /products/a/b or alternatively create a Optional Catch all by including the the file name in double square brackets [[..slug]]*/

import React, { useState } from "react";
import { client, urlFor } from "../../../lib/client";
import {
  AiFillStar,
  AiOutlineStar,
  AiOutlinePlus,
  AiOutlineMinus,
} from "react-icons/ai";
import { Product } from "../../../components";
import { useStateContext } from "../../../context/StateContext";

const ProductDetails = ({ product, products }) => {
  // destructing the props of product
  const { image, name, details, price } = product;

  const [index, setIndex] = useState(0);

  const { increaseQuantity, decreaseQuantity, itemCount, onAdd } =
    useStateContext();

  // console.log(decreaseQuantity && increaseQuantity);
  return (
    <>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              alt=""
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, index) => (
              //passing a dynamic className to the image
              <img
                src={urlFor(item)}
                alt=""
                className={
                  index === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(index)}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
            {/* //** To make the rating dynamic we must implement this    
             //*todo <input type="radio" id="star5" name="rating" value="5" />
            //*todo <label for="star5"></label>
            //*todo <input type="radio" id="star4" name="rating" value="4" />
            //*todo <label for="star4"></label>
            //*todo <input type="radio" id="star3" name="rating" value="3" />
            //*todo <label for="star3"></label>
           //*todo <input type="radio" id="star2" name="rating" value="2" />
           //*todo <label for="star2"></label>
           //*todo <input type="radio" id="star1" name="rating" value="1" />
        //*todo <label for="star1"></label> */}
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
            <button type="button" className="buy-now">
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

//**!GetStaticProps(static site generation) */
//**on the page you export the function nextjs will pre-render the page at build time */
//**! When should I use getStaticProps()? */
//** You should use it if:
//* - The data required to render the page is available at build time ahead of a user's request.
//* - The data comes from a headless CMS(this is our case).
//* - The page must be pre-rendered (for SEO) and be very fast -- getStaticProps genretares HTML and JSON files.
//* - the data can be publicly cached

//**! GetStaticPaths() */
//**getStaticPaths() is to be used in conjunction with getStaticProps() to enable dynamic routes with pre-rendering. it is typically used when you have dynamic routes that depend on data from an external source */
//** How getStaticPaths() works
//** 1. you define the function getStaticPaths() - it must be exported as a function.
//** 2. inside the function you fetch the data required to generate the dynamic path
//** 3. process the fetched data to return an object that specifies the dynamic path - the object has to two properties: "paths" and "fallback"
//** - "paths": An array of objects where each represents a dynamic path. Each object in this array must have a params property, which is an object containing dynamic parameters for that path. EG if we have the dynamic route "/products/[slug]", the params object would be "slug" with the corresponding value.
//** - "fallback": A boolean value that determines what happens when a request is made to a path that hasn't been pre-rendered. If fallback is false, Nextjs will return a 404 page for the path, if true nextjs will attempt to return a request path on the fly and return the generated page.  this is good when you have multiple dynamic paths that cannot be pre-rendered at build time.
//** 4. Nextjs uses the paths returned by getStaticPaths() to pre-render the corresponding pages at build time. For each path nextjs calls the getStaticProps() function with the corresponding "params" object, which allows us to fetch the and pass the data to the page component.

export const getStaticPaths = async () => {
  const query = `*[_type== "product"]
{slug{current}}
`;
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
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;

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
