import React from "react";
import {
  AiFillInstagram,
  AiOutlineTwitter,
  AiOutlineCopyright,
} from "react-icons/ai";
function Footer() {
  const copyRight = new Date().getFullYear();
  return (
    <div className="footer-container">
      {" "}
      {`${copyRight} TrendVault All Rights Reserved.`}
      <AiOutlineCopyright />
      <p className="icons">
        {" "}
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  );
}

export default Footer;
