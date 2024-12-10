import React, { useEffect, useRef, useState } from "react";
import axios from "axios"
import logo from "../../assets/images/logos/logo.svg";
import { NavLink } from "react-router-dom";
import Mainwrapper from "../Mainwrapper.jsx";
const Login = () => {
  const mobilenovalidationmessage = useRef();
  const alertcontainerref = useRef();
  const alertref = useRef();

  useEffect(() => {
    const VerifyingUserLoggedIn = () => {
      const isUserPresent = JSON.parse(localStorage.getItem('userCreds'));
      if (isUserPresent) {
        window.location.href = "/";
        return;
      }
    }
    VerifyingUserLoggedIn();
  }, [])

  const [formData, setFormData] = useState({
    mobileNo: "",
    password: ""
  })
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,//preserving the cuurent state of Form Data
      [id]: value//here id is a key which we passed in input field and value is the actual value user is giving
      //It will append the value to particular id and ... will preserve the previous data
    }))//({}) This explicitly tells JavaScript that the function is returning an object literal, {}, directly.
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.mobileNo, formData.password);
    mobilenovalidationmessage.current.style.color = "red";
    const convertedtonumData = Number(formData.mobileNo);
    if (isNaN(convertedtonumData)) {
      mobilenovalidationmessage.current.textContent = "Please enter a valid number";
      console.log("Please enter a valid number");
      return;
    } else if (formData.mobileNo.length > 10 || formData.mobileNo.length < 10) {
      mobilenovalidationmessage.current.textContent = "Mobile number must be of  10 digit";
      console.log("Mobile number must be of  10 digit");
      return;
    }
    try {
      const response = await axios.post("http://stock.swiftmore.in/mobileApis/userLogin.php", formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Ensuring it's form data
        }
      });
      const { success, userName, message } = response.data;
      if (message === "Login success") {
        console.log(success, userName);
        alertcontainerref.current.style.display = "block";
        alertref.current.style.display = "block";
        alertref.current.className = "alert alert-info";
        alertref.current.textContent = response.data.message;
        localStorage.setItem("userCreds", JSON.stringify({ success, userName }));
        window.location.href = "/";
      } else {
        alertcontainerref.current.style.display = "block";
        alertref.current.style.display = "block";
        alertref.current.className = "alert alert-danger";
        alertref.current.textContent = response.data.message;
      }
    } catch (error) {
      console.error("error during login", error.response?.data || error.message);
    }
  }



  return <div>
    <Mainwrapper>
      <div
        className="position-relative overflow-hidden text-bg-light min-vh-100 d-flex align-items-center justify-content-center">
        <div className="d-flex align-items-center justify-content-center w-100">
          <div className="row justify-content-center w-100">
            <div className="col-md-8 col-lg-6 col-xxl-3">
              <div style={{ display: "none" }} className="container d-flex justify-content-center" ref={alertcontainerref} >
                <div style={{ display: "none" }} role="alert" ref={alertref}></div>
              </div>
              <div className="card mb-0">
                <div className="card-body">
                  <a href="/" className="text-nowrap logo-img text-center d-block py-3 w-100">
                    <img src={logo} alt="logo-image" />
                  </a>
                  <p className="text-center">Your Social Campaigns</p>
                  <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="mb-3">
                      <label htmlFor="mobileNo" className="form-label">Mobile Number</label>
                      <input type="text" className="form-control" id="mobileNo" aria-describedby="emailHelp" value={formData.mobileNo} onChange={handleChange} required />
                      <p id="mobilenovalidationmessage" ref={mobilenovalidationmessage}></p>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input type="password" className="form-control" id="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <a className="text-primary fw-bold" href="/">Forgot Password ?</a>
                    </div>
                    <input type="submit" className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2" value="Sign In" />
                    <div className="d-flex align-items-center justify-content-center">
                      <p className="fs-4 mb-0 fw-bold">New to Matdash?</p>
                      <NavLink className="text-primary fw-bold ms-2" to="/register">Create an account</NavLink>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Mainwrapper>
  </div>;
};

export default Login;
