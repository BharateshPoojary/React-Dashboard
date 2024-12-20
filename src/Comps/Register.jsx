import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/images/logos/logo.svg";
import { NavLink } from "react-router-dom";
import Mainwrapper from "../Mainwrapper.jsx";
import axios from "axios";
import toast from "react-hot-toast";
// import { updateUserCreds } from "../../slice/userCredsSlice.js";
// import { useSelector } from "react-redux";
const Register = () => {
  // const navigate = useNavigate('/');
  // const dispatch = useDispatch();
  // const userCreds = useSelector(state => state.userCreds);
  const usernamevalidationmessage = useRef();
  const mobilenovalidationmessage = useRef();

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
    // console.log(userCreds);
    // if (userCreds.userId !== 0) {
    //   // window.location.href = "/";
    //   navigate('/');
    //   return;
    // }
  }, [])
  const handleChange = (e) => {
    const { id, value } = e.target;
    setRegisterFormData((prev) => ({
      ...prev,
      [id]: value
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const convertedToNumData = Number(registerFormData.userName);
    console.log(convertedToNumData);
    // return;
    if (!isNaN(convertedToNumData)) {
      usernamevalidationmessage.current.style.color = "red";
      usernamevalidationmessage.current.textContent = "enter a valid name"
      return;
    }
    const convertedtonumData = Number(registerFormData.mobileNo);
    mobilenovalidationmessage.current.style.color = "red";
    if (isNaN(convertedtonumData)) {
      mobilenovalidationmessage.current.textContent = "Please enter a valid number";
      console.log("Please enter a valid number");
      return;
    }
    if (registerFormData.mobileNo.length > 10 || registerFormData.mobileNo.length < 10) {
      mobilenovalidationmessage.current.textContent = "Mobile number must be of  10 digit";
      console.log("Mobile number must be of  10 digit");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("userName", registerFormData.userName);
      formData.append("password", registerFormData.password);
      formData.append("mobileNo", registerFormData.mobileNo);
      const response = await axios.post("http://stock.swiftmore.in/mobileApis/userRegister.php", formData);
      console.log(response.data);
      const { success, message } = response.data;
      if (success === 1) {
        const { userId, userName, mobileNo, password } = response.data;
        toast.success(message);
        // localStorage.setItem("userCreds", JSON.stringify({ userId, userName, success, mobileNo, password }))

        // dispatch(updateUserCreds({ userName, mobileNo, userId, password, success }));
        localStorage.setItem('userCreds', JSON.stringify({ userName, mobileNo, userId, password, success }));
        window.location.href = "/";
        // navigate('/', { replace: true });
      } else {
        toast.error(message);
      }

    } catch (error) {
      toast.error("error during register");
      console.log(error.response?.data || error.message);// return the first truthy value it encounters
    }
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
                      <input type="text" className="form-control" id="userName" value={registerFormData.userName} onChange={handleChange} aria-describedby="textHelp" required />
                    </div>
                    <p id="usernamevalidationmessage" ref={usernamevalidationmessage} ></p>
                    <div className="mb-3">
                      <label htmlFor="mobileNo" className="form-label">Mobile Number</label>
                      <input type="text" className="form-control" id="mobileNo" value={registerFormData.mobileNo} onChange={handleChange} aria-describedby="emailHelp" required />
                    </div>
                    <p id="mobilenovalidationmessage" ref={mobilenovalidationmessage}></p>
                    <div className="mb-4">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input type="password" className="form-control" id="password" value={registerFormData.password} onChange={handleChange} required />
                    </div>
                    <input type="submit" className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2" value="Sign Up" />
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
