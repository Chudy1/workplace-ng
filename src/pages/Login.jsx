import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onClick = async (e) => {
    e.preventDefault();
    navigate("/sign-up");
  };

  //   className={type === "rent" ? "formButtonActive" : "formButton"}

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      toast.error("Wrong User Credentials");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="loginDiv">
        <div className="childDiv">
          <header className="loginHeader">
            <p>Login</p>
          </header>
          <form onSubmit={onSubmit} className="signupForms">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="E-mail"
              className="loginLeft"
              onChange={onChange}
            />
            <div>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                placeholder="Password"
                className="loginLeft"
                onChange={onChange}
              />
            </div>
            <Link to="/forgot-password" className="forgotPasswordLink">
              Forgot Password?
            </Link>

            <div>
              <button type="submit" className="btnSubmit">
                Login
              </button>
            </div>
          </form>
        </div>

        <div className="childDiv">
          <header className="loginHeader">
            <p>Create your Workspace Account</p>
          </header>
          <form className="signupForms">
            <div className="loginRight">
              <p>
                Create your Workspace account in just a few clicks! You can
                register either using your e-mail address or through Facebook
                account
              </p>
            </div>

            <div>
              <button type="submit" className="btnSubmit" onClick={onClick}>
                CREATE ACCOUNT VIA EMAIL
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
