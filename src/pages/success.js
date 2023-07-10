/** this is the success page for sucessful payments with stripe  */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";

import { useStateContext } from "../../context/StateContext";
import fireWorks from "../../lib/utils";
const success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantity } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantity(0);
    fireWorks();
  }, []);
  return (
    <>
      <div className="success-wrapper">
        <div className="success">
          <p className="icon">
            <BsBagCheckFill />
          </p>
          <h2>Thank your for your purchase</h2>
          <p className="email-msg">
            Check your email for the purchase details and Receipt
          </p>
          <p className="description">
            if you have any questions, please email{" "}
            <a href="mailto:orders@trendvault.com" className="email">
              orders@trendvault.com
            </a>
          </p>
          <Link href="/">
            <button type="button" className="btn" width="300px">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default success;
