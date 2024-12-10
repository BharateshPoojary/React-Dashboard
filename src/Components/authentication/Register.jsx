import React, { useState } from "react";
import logo from "../../assets/images/logos/logo.svg";
import { NavLink, redirect } from "react-router-dom";
import Mainwrapper from "../Mainwrapper.jsx";
const Register = () => {
  const [registerFormData, setRegisterFormData] = useState({
    userName: '',
    mobileNo: '',
    password: ''
  })
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
  const handleChange = (e) => {
    const { id, value } = e.target;
    setRegisterFormData((prev) => ({
      ...prev,
      [id]: value
    }))
  }
  const handleSubmit = () => {

  }
  return <div>
    <Mainwrapper>
      <div
        className="position-relative overflow-hidden text-bg-light min-vh-100 d-flex align-items-center justify-content-center">
        <div className="d-flex align-items-center justify-content-center w-100">
          <div className="row justify-content-center w-100">
            <div className="col-md-8 col-lg-6 col-xxl-3">
              <div className="card mb-0">
                <div className="card-body">
                  <a href="/" className="text-nowrap logo-img text-center d-block py-3 w-100">
                    <img src={logo} alt="logoimage" />
                  </a>
                  <p className="text-center">Your Social Campaigns</p>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="userName" className="form-label">Name</label>
                      <input type="text" className="form-control" id="userName" value={registerFormData.userName} onChange={handleChange} aria-describedby="textHelp" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="mobileNo" className="form-label">Mobile Number</label>
                      <input type="email" className="form-control" id="mobileNo" value={registerFormData.mobileNo} onChange={handleChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input type="password" className="form-control" id="password" value={registerFormData.mobileNo} onChange={handleChange} />
                    </div>
                    <input type="submit" value={"Sign Up"} />
                    <div className="d-flex align-items-center justify-content-center">
                      <p className="fs-4 mb-0 fw-bold">Already have an Account?</p>
                      <NavLink className="text-primary fw-bold ms-2" to="/login">Sign In</NavLink>
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

export default Register;
