import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import Dropdown from "./Dropdown";
import { FaRegHeart } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa";
import { BiQuestionMark } from "react-icons/bi";

function Navbar() {
  const [isVisible, setIsVisible] = useState(true);

  const onClick = () => setIsVisible(false);

  return (
    <>
      <nav className="navbar">
        <h1>Name Logo</h1>
        <div className="searchBar">
          <SearchBar />
        </div>
        <div className="navright">
          <Link to="/login" onClick={onClick} className="navRightLinks">
            <FaRegUser />
            <span className="navRightLinks">Account</span>
            <BiChevronDown />
          </Link>

          {/* This is the dropdown */}
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

          <Link to="/" className="navRightLinksHide">
            <BiQuestionMark />
            <span className="navRightLinks">Help </span>
            <BiChevronDown />
          </Link>
          <Link to="/" className="navRightLinksHide">
            <FaShoppingCart />
            <span className="navRightLinks">Cart</span>
            <BiChevronDown />
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
