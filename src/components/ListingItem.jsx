import React from "react";
import { Link } from "react-router-dom";

function ListingItem({ listing, id }) {
  return (
    <li className="categoryListingLink">
      <Link to={`/category/${listing.type}/${id}`}>
        <img
          src={listing.imageUrls[0]}
          alt={listing.name}
          className="categoryListingImage"
        />
      </Link>
      <div className="categoryListingDiv">
        <p>{listing.name}</p>
        <p>{listing.noOfPairs} Pairs available in the stores</p>
        <p>
          {listing.offer ? listing.discountedPrice : listing.regularPrice} per
          pair of {listing.type} {listing.name}
        </p>
        <p>Shipping from {listing.location}</p>
      </div>
    </li>
  );
}

export default ListingItem;
