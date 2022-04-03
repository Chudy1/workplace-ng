import React, { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase.config";
import { doc, updateDoc } from "firebase/firestore";

function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [changeDetails, setChangeDetails] = useState(false);

  const [formData, setFormData] = useState({
    firstName: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { email, firstName } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        auth.currentUser.displayName !== firstName ||
        auth.currentUser.email !== email
      ) {
        //1) update displayname on firebase
        await updateProfile(auth.currentUser, {
          displayName: firstName,
          email: email,
        });

        //1) update email on fireb
        //3) update name on firestore
        const userRef = doc(db, "users", auth.currentUser.uid);

        await updateDoc(userRef, {
          firstName,
          email,
        });
        navigate("/");
      }
    } catch (error) {
      toast.error("Could not update profile");
    }
  };

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <div className="profileDiv">
      <header className="profileFlex">
        <p className="profileHeader">My Profile</p>
        <button className="btnLogout" onClick={onLogout}>
          Logout
        </button>
      </header>
      <header className="profileFlex">
        <p className="profileHeader">My Profile Details</p>
        <p
          className="changePersonalDetails"
          onClick={() => {
            setChangeDetails((prevState) => !prevState);
          }}
        >
          {changeDetails ? "Done" : "Change"}
        </p>
      </header>

      <form>
        <div className="signupForm">
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={firstName}
            className={changeDetails ? "signupInput" : "profileEditFormActive"}
            onChange={onChange}
            disabled={!changeDetails}
          />

          <input
            type="email"
            name="email"
            id="email"
            value={email}
            className={changeDetails ? "signupInput" : "profileEditFormActive"}
            onChange={onChange}
            disabled={!changeDetails}
          />
        </div>

        <div>
          <button type="submit" className="btnSubmitSignup" onClick={onSubmit}>
            Update Profile
          </button>
        </div>
      </form>

      <div className="createListing">
        <Link to="/create-listing">
          <h3>Update your store</h3>
        </Link>
      </div>
    </div>
  );
}

export default Profile;
