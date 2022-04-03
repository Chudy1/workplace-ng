import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="footerbar">
        <Link to="/profile">Profile</Link>
      </div>
    </>
  );
}

export default Footer;
