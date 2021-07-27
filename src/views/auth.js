import { useState } from "react";
import "../styles/auth.css";
import validator from "validator";
import axios from "axios";
import { useHistory } from "react-router";

const Auth = () => {
  const [loginView, setLoginView] = useState(true);
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [registerDetails, setRegisterDetails] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone_number: "+",
    confirmPassword: "",
    user_type: "customer",
  });

  let history = useHistory();

  const handleLogin = async () => {
    setLoginError("");

    if (loginData.email === "" || !validator.isEmail(loginData.email)) {
      setLoginError("Invalid Email");
      return;
    }
    if (loginData.password === "") {
      setLoginError("Please Enter Password");
      return;
    }
    setLoading(true);

    try {
      const res = await axios.post(
        "https://lit-eyrie-58493.herokuapp.com/api/auth/login",
        loginData
      );
      console.log(res);
      if (res.statusText === "OK") {
        localStorage.setItem("user_name", res.data.first_name);
        history.push(`home/${res.data.id}`);
      }
    } catch (err) {
      setLoginError("Invalid Credentials Entered");
    }
    setLoading(false);
  };

  const handleRegister = async () => {
    setRegisterError("");

    if (
      registerDetails.first_name === "" ||
      !validator.isAlpha(registerDetails.first_name)
    ) {
      setRegisterError("Invalid Name");
      return;
    }
    if (
      registerDetails.last_name === "" ||
      !validator.isAlpha(registerDetails.last_name)
    ) {
      setRegisterError("Invalid last Name");
      return;
    }
    if (registerDetails.email === "" || !validator.isEmail(loginData.email)) {
      setRegisterError("Invalid Email");
      return;
    }
    // if (!validator.isMobilePhone(registerDetails.phone_number.toString())) {
    //   setRegisterError("Invalid Phone Number");
    //   return;
    // }
    if (registerDetails.password === "") {
      setRegisterError("Please Enter Password");
      return;
    }
    if (registerDetails.confirmPassword !== registerDetails.password) {
      setRegisterError("Passwords Doesn't Match");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "https://lit-eyrie-58493.herokuapp.com/api/auth/register",
        registerDetails
      );
      console.log(res);
      if (res.statusText === "Created") {
        setRegisterSuccess("Registration SuccessFull");
        setTimeout(() => {
          setLoginView(true);
        }, 2000);
      }
    } catch (err) {
      setRegisterError(err.toString());
    }

    setLoading(false);
  };

  return (
    <div>
      {loginView ? (
        <>
          <div className="auth-titles">Login Page</div>
          <div className="auth-box">
            <input
              placeholder="email"
              type="email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
            <input
              placeholder="password"
              type="password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
            <div className="error-message">{loginError}</div>
            <button className="submit-button" onClick={handleLogin}>
              {loading ? "..." : "Login"}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="auth-titles">Register Page</div>
          <div className="auth-box">
            <div className="name-inputs">
              <input
                placeholder="first_name"
                type="text"
                value={registerDetails.first_name}
                onChange={(e) =>
                  setRegisterDetails({
                    ...registerDetails,
                    first_name: e.target.value,
                  })
                }
              />
              <input
                placeholder="last_name"
                type="text"
                value={registerDetails.last_name}
                onChange={(e) =>
                  setRegisterDetails({
                    ...registerDetails,
                    last_name: e.target.value,
                  })
                }
              />
            </div>
            <input
              placeholder="email"
              type="email"
              value={registerDetails.email}
              onChange={(e) =>
                setRegisterDetails({
                  ...registerDetails,
                  email: e.target.value,
                })
              }
            />
            <input
              placeholder="phone"
              type="text"
              value={registerDetails.phone_number}
              onChange={(e) =>
                setRegisterDetails({
                  ...registerDetails,
                  phone_number: e.target.value,
                })
              }
            />
            <input
              placeholder="password"
              type="password"
              value={registerDetails.password}
              onChange={(e) =>
                setRegisterDetails({
                  ...registerDetails,
                  password: e.target.value,
                })
              }
            />
            <input
              placeholder="confirm password"
              type="password"
              value={registerDetails.confirmPassword}
              onChange={(e) =>
                setRegisterDetails({
                  ...registerDetails,
                  confirmPassword: e.target.value,
                })
              }
            />
            <div className="error-message">{registerError}</div>
            <div className="success-message">{registerSuccess}</div>
            <button className="submit-button" onClick={handleRegister}>
              {loading ? "..." : "Register"}
            </button>
          </div>
        </>
      )}

      {!loading ? (
        <div>
          <button className="toggler" onClick={() => setLoginView(!loginView)}>
            {loginView ? "Register" : "Login"}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Auth;
