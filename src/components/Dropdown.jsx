import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa";

function Dropdown() {
  return (
    <ul className="nobull">
      <li>
        <button className="btnFloat">Sign Up</button>
      </li>

      <li>
        <Link to="/login" className="navLink">
          <div>
            <FaRegUser />
            <span className="navRightLinks">My Account</span>
          </div>
        </Link>
      </li>

      <li>
        <Link to="/login" className="navLink">
          <div>
            <FaRegCreditCard />
            <span className="navRightLinks">Orders</span>
          </div>
        </Link>
      </li>

      <li>
        <Link to="/login" className="navLink">
          <div>
            <FaRegHeart />
            <span className="navRightLinks">Saved Items</span>
          </div>
        </Link>
      </li>
    </ul>
  );
}

export default Dropdown;
