import React, { useRef, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db } from "../firebase.config";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

function CreateListing() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "foreign",
    name: "",
    offer: true,
    discountedPrice: 0,
    regularPrice: 0,
    location: "",
    images: {},
    noOfPairs: 1,
  });

  const {
    type,
    name,
    offer,
    discountedPrice,
    regularPrice,
    location,
    images,
    noOfPairs,
  } = formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate("/login");
        }
      });
    }
    return () => {
      isMounted.current = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (discountedPrice >= regularPrice) {
      setLoading(false);
      toast.error("The discounted price should be less than the regular price");
      return;
    }

    if (images.length > 6) {
      setLoading(false);
      toast.error("Max of 6 images");
      return;
    }

    //upload to firebase storage
    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();

        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;

        const storageRef = ref(storage, "images/" + fileName);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const imageUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch(() => {
      setLoading(false);
      toast.error("Images not uploaded");
      return;
    });

    const formDataCopy = {
      ...formData,
      imageUrls,
      timestamp: serverTimestamp(),
    };

    delete formDataCopy.images;
    !formDataCopy.offer && delete formDataCopy.discountedPrice;

    const docRef = await addDoc(collection(db, "listings"), formDataCopy);
    setLoading(false);
    toast.success("Listing Saved");
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  };

  const onMutate = (e) => {
    let boolean = null;

    if (e.target.value === "true") {
      boolean = true;
    }

    if (e.target.value === "false") {
      boolean = false;
    }

    //Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }

    //texts, booleans, Numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  if (loading) {
    return <h4>Loading...</h4>;
  }

  return (
    <div>
      <header>
        <h1 className="pageHeader">Update your store</h1>
      </header>

      <main>
        <form onSubmit={onSubmit} className="createListingForm">
          <label className="formLabel">Foreign Or Local</label>
          <div className="formButtons">
            <button
              type="button"
              className={type === "foreign" ? "formButtonActive" : "formButton"}
              id="type"
              value="foreign"
              onClick={onMutate}
            >
              Foreign
            </button>
            <button
              type="button"
              className={type === "local" ? "formButtonActive" : "formButton"}
              id="type"
              value="local"
              onClick={onMutate}
            >
              Local
            </button>
          </div>

          <label className="formLabel">Name</label>
          <input
            className="formInputName"
            type="text"
            id="name"
            value={name}
            onChange={onMutate}
            maxLength="20"
            minLength="5"
            required
          />

          <label className="formLabel">Pairs</label>
          <input
            className="formInputSmall"
            type="number"
            id="noOfPairs"
            value={noOfPairs}
            onChange={onMutate}
            min="1"
            required
          />

          <label className="formLabel">Location</label>
          <input
            className="formInputName"
            type="text"
            id="location"
            value={location}
            onChange={onMutate}
            maxLength="20"
            minLength="5"
            required
          />

          <label className="formLabel">Offer</label>
          <div className="formButtons">
            <button
              className={offer ? "formButtonActive" : "formButton"}
              type="button"
              id="offer"
              value={true}
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              className={
                !offer && offer !== null ? "formButtonActive" : "formButton"
              }
              type="button"
              id="offer"
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>

          <label className="formLabel">Regular Price</label>
          <div className="formPriceDiv">
            <input
              className="formInputSmall"
              type="number"
              id="regularPrice"
              value={regularPrice}
              onChange={onMutate}
              min="50"
              max="750000000"
              required
            />
          </div>

          {offer && (
            <>
              <label className="formLabel">Discounted Price</label>
              <input
                className="formInputSmall"
                type="number"
                id="discountedPrice"
                value={discountedPrice}
                onChange={onMutate}
                min="5"
                max="7500000"
                required={offer}
              />
            </>
          )}

          <label className="formLabel">Images</label>
          <p className="imagesInfo">
            The first image will be the cover (max 6).
          </p>
          <input
            className="formInputFile"
            type="file"
            id="images"
            onChange={onMutate}
            max="6"
            accept=".jpg,.png,.jpeg"
            multiple
            required
          />

          <button type="submit" className="primaryButton createListingButton">
            Create Your Store
          </button>
        </form>
      </main>
    </div>
  );
}

export default CreateListing;
