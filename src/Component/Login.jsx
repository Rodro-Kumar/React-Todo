import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ref, set } from "firebase/database";
import { db } from "../../Firebase/Sdk";

const Login = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [createAccount, setcreateAccount] = useState(false);
  const HandleCreateAccount = () => {
    setcreateAccount(!createAccount);
  };

  const [userData, setuserData] = useState({
    Name: "",
    Email: "",
    Password: "",
  });

  // Handle sign up data store in firebase
  const HandleSignUp = () => {
    createUserWithEmailAndPassword(
      auth,
      userData.Email,
      userData.Password,
      userData.Name
    ).then((user) => {
      const { localId } = user?.user.reloadUserInfo;
      set(ref(db, "users" + localId), {
        username: userData.Name,
        email: userData.Email,
        password: userData.Password,
      });
      alert("Sign up complete");
      setcreateAccount(false);
    });
  };

  // HandleLogin user
  const HandleLogin = () => {
    const { Email, Password } = userData;
    if (!Email || !Password) {
      alert("Email and password cannot be empty");
      return;
    }
    signInWithEmailAndPassword(auth, Email, Password)
      .then((userCredential) => {
        // Signed in
        alert("Sign in successfully");

        // Additional logic after login
        navigate("/todo");
      })
      .catch((error) => {
        alert("Error: " + error.message); // Display the specific error message
      });
  };

  // Handle Input Value
  const HandleInput = (event) => {
    setuserData({
      ...userData,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <div>
      <div className="container">
        <div className="hero min-h-screen">
          <div className="hero-content w-full flex-col">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold font-poppins text-[#7480ff]">
                {createAccount ? "Create Account" : "Login"}
              </h1>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <form className="card-body" onSubmit={(e) => e.preventDefault()}>
                {createAccount && (
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Name"
                      className="input input-bordered"
                      id="Name"
                      name="Name"
                      onChange={HandleInput}
                      value={userData.Name}
                    />
                  </div>
                )}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    id="Email"
                    name="Email"
                    onChange={HandleInput}
                    value={userData.Email}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    id="Password"
                    name="Password"
                    onChange={HandleInput}
                    value={userData.Password}
                  />
                </div>
                <div className="form-control mt-6">
                  {createAccount ? (
                    <button onClick={HandleSignUp} className="btn btn-accent">
                      Sign up
                    </button>
                  ) : (
                    <button onClick={HandleLogin} className="btn btn-primary">
                      Login
                    </button>
                  )}
                </div>
                <div className="form-control mt-6">
                  <h5
                    onClick={HandleCreateAccount}
                    className="font-poppins font-medium cursor-pointer text-[#7480ff] underline"
                  >
                    {createAccount ? "Sign in" : "Create Account"}
                  </h5>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
