import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  startAfter,
  limit,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import ListingItem from "./ListingItem";

function Category() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        //Get Reference to the collection
        const listingsRef = collection(db, "listings");

        //query reference
        const q = query(
          listingsRef,
          where("type", "==", params.categoryType),
          orderBy("timestamp", "desc"),
          limit(10)
        );

        //Take a snapshop of the query or Executing the query
        const querySnap = await getDocs(q);

        const listings = [];

        querySnap.forEach((doc) => {
          listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Collections not found");
      }
    };
    fetchListings();
  }, []);

  return (
    <div>
      <header>
        <h1>
          {params.categoryType === "foreign"
            ? "Foreign Categories"
            : "Local Categories"}
        </h1>
      </header>

      <div className="categoryContainer">
        {loading ? (
          "Loading..."
        ) : listings && listings.length > 0 ? (
          <>
            <main>
              <ul>
                {listings.map((listing) => (
                  <ListingItem
                    listing={listing.data}
                    id={listing.id}
                    key={listing.id}
                  />
                ))}
              </ul>
            </main>
          </>
        ) : (
          "No Listings Found"
        )}
      </div>
    </div>
  );
}

export default Category;
