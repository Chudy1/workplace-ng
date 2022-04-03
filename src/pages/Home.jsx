import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import shoe1 from "../images/shoe1.avif";
import shoe2 from "../images/shoe2.avif";

function Home() {
  return (
    <>
      <Navbar />
      {/* The Categories */}
      <div className="homeCategorycontainer">
        <Link to="category/foreign">
          <img src={shoe1} alt="foreign" className="categoryImage" />
          <div className="CategoryName">
            <h3>Foreign footwear</h3>
          </div>
        </Link>
        <Link to="category/local">
          <img src={shoe2} alt="foreign" className="categoryImage" />
          <div className="CategoryName">
            <h3>Country-made footwear</h3>
          </div>
        </Link>
      </div>
<br/>
              <br/>
              <br/>
      <h1>This is expected to be seen</h1>
      <Footer />
    </>
  );
}

export default Home;
