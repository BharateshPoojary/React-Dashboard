import React, { useEffect, useState, useRef } from "react";
import axios from "axios"
import logo from "../assets/images/logos/logo.svg";
import { NavLink } from "react-router-dom";
import Mainwrapper from "../Mainwrapper.jsx";
import toast from "react-hot-toast";
// import { updateUserCreds } from "../../slice/userCredsSlice.js";
// import { useSelector } from "react-redux";

const Login = () => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  const mobilenovalidationmessage = useRef();
  // const userCreds = useSelector(state => state.userCreds);
  // useEffect(() => {
  //   console.log(userCreds);
  //   if (userCreds.userId !== 0) {
  //     navigate("/");
  //     return;
  //   }
  // }, [userCreds, userCreds.userId])

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
      const { success, message } = response.data;
      if (success === 1) {
        const { userId, userName, mobileNo, password } = response.data;
        console.log(success, userName);
        toast.success(message);
        // localStorage.setItem("userCreds", JSON.stringify({ success, userId, userName, mobileNo, password }));
        // dispatch(updateUserCreds({ userId, userName, mobileNo, password, success }));
        localStorage.setItem('userCreds', JSON.stringify({ userId, userName, mobileNo, password, success }))
        // const updatedUserCreds = useSelector((state) => state.userCreds);
        // navigate('/', { replace: true });
        window.location.href = "/";
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("error during login");
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
