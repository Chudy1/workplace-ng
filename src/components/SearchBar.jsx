import React from "react";
// import { useLocation } from "react-router-dom";

function SearchBar() {
  return (
    <>
      <form>
        <input
          type="text"
          name="text"
          id="text"
          placeholder="Search for your favorite footwear here..."
          className="searchbar"
        />

        <button type="submit" className="btn">
          Search
        </button>
      </form>
    </>
  );
}

export default SearchBar;
