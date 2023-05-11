import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";

import Footer from "./Footer";

/** In nextjs the Head is the same as the head tag in html that will give you meta data about the site such as the page title, description.
 it will allow us to dynamically update the context of the head for each page of the application.
 */

//  here we are setting the metadata for the layout of site
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>TrendVault</title>
        <meta property="og:title" content="TrendVault" key="title" />
      </Head>
      <header>
        <Navbar />
        <meta property="og:navbar" key="navbar" />
      </header>

      <main className="main-container">{children}</main>
      <footer>
        <Footer />
        <meta property="og:footer" key="footer" />
      </footer>
    </div>
  );
};

export default Layout;
