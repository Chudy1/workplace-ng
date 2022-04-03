import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
import { db } from "../firebase.config";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { firstName, lastName, email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: firstName,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
    } catch (error) {
      toast.error("Oops! Something went wrong");
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <header className="childDiv">
          <p className="signUpHeader">Create Account</p>
        </header>
        <div>
          <form onSubmit={onSubmit}>
            <div className="signupForm">
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={firstName}
                placeholder="First Name"
                className="signupInput"
                onChange={onChange}
              />
              <div>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={lastName}
                  placeholder="Last Name"
                  className="signupInput"
                  onChange={onChange}
                />
              </div>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                placeholder="E-mail"
                className="signupInput"
                onChange={onChange}
              />
              <div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  placeholder="Password"
                  className="signupInput"
                  onChange={onChange}
                />
              </div>
            </div>

            <div>
              <button type="submit" className="btnSubmitSignup">
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Signup;
