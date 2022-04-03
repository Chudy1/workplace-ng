import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const onChange = (e) => setEmail(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email link sent");
    } catch (error) {
      toast.error("Email not sent");
    }
  };

  return (
    <div className="ResetPasswordContainer">
      <header className="loginHeader">
        <p>Forgot Password</p>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <div>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              className="loginLeft"
              onChange={onChange}
            />

            <div>
              <button className="btnSubmitReset">Send Reset Link</button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ForgotPassword;
