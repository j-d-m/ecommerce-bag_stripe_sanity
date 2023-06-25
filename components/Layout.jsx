import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";

import Footer from "./Footer";

// **  here we are setting the metadata for the layout of site and receiving the children props and passing them down to the main */
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
