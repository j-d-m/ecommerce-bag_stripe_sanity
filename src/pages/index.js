import React from "react";
import { client } from "../../lib/client";
import { Product, HeroBanner, Footer, FooterBanner } from "../../components";
{
  /*reciving the props from below*/
}
function Home({ products, bannerData }) {
  return (
    <div>
      {/* bannerData is an array with on object and we will always be passing the first element of that array */}
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      {/* {console.log(bannerData)} */}
      {/* {console.log(bannerData.length)} */}
      <div className="products-heading">
        <h2>Best Selling Accessories</h2>
        <p>Multiple different Accessories</p>
      </div>
      {/*mapping over the products */}
      <div className="products-container">
        {products?.map((product) => (
          /*passing the product key in the loop as the product key and the product value as the Product component*/
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footer={bannerData && bannerData[0]} />
    </div>
  );
}

/* getServerSideProps hook in next.js

getServerSideProps will pre-render a pages on each request and the hook will run on the server side if a page uses the hook then - when you request that page directly the hook will run and the page will be pre-rendered with the returned props. or; when you request that page through next/link or next/router Next.js sends an API request to the server causing the hook to run.

1.getServerSideProps returns a JSON
2.getServerSideProps can only be exported from a PAGE, you cannot export it from non-page files.
3.getServerSideProps MUST be exported as a stand alone function. it will not work if you add it as a property on the page component.

  When to use the hook

  you should use getServerSideProps only if you need to render a page who's data must be fetched at request time
*/

/*Queries in sanity - GROQ
the idea behind GROQ(Graph-Relational object queries) is the ability to be able to describe exactly the information your application needs, you can join multiple sets of documents, then stitch together a very specific response with the exact flied you need.
** A Query typically starts with an *. This asterisk represents every document in your dataset, this is then followed by a filter in brackets, our filters have just one term
*** The filter
First we filter by document type. Remember every document is required to have a type in the schema. the type is always in the _type field (always use and underscore so we dont crash with any field names) so we are linking our queries to all _types that is equal to "products" or "banner"
*/
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
