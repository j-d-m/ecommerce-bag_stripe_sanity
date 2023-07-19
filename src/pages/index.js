import React from "react";
import { client } from "../../lib/client";
import { Product, HeroBanner, Footer, FooterBanner } from "../../components";

function Home({ products, bannerData }) {
  return (
    <>
      {/* bannerData is an array with on object and we will always be passing the first element of that array */}
      {bannerData.length && <HeroBanner heroBanner={bannerData[0]} />}
      {console.log(bannerData)}
      <div className="products-heading">
        <h2>Best Selling Accessories</h2>
        <p>Multiple different Accessories</p>
      </div>
      {/*mapping over the products */}
      <div className="products-container">
        {products?.map((product) => (
          /*passing the product key word in the map as the product key and the product value as the Product component*/
          <Product key={product._id} product={product} />
        ))}
      </div>
      {bannerData && <FooterBanner Footer={bannerData[0]} />}
    </>
  );
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';

  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);
  {
    /*remember what ever is returned from getServerSideProps
    will be populated to our main function via the props
    */
  }
  return {
    props: {
      products,
      bannerData,
    },
  };
};
export default Home;
