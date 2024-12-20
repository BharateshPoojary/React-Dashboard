import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Button = () => {
  const navigate = useNavigate();
  const userCreds = useSelector(state => state.userCreds);
  const { value } = useSelector(state => state.toggleSlice);
  useEffect(() => {
    if (userCreds.userId === 0) {
      try {
        const { userName, mobileNo, password, success, userId } = JSON.parse(localStorage.getItem("userCreds"));
        dispatch(updateUserCreds({ userName, mobileNo, password, success, userId }))
      } catch (error) {
        navigate('/login');//not able to destructure property which means user is not logged in 
      }
    }
  }, [userCreds.userId])
  return <div>
    <div className="body-wrapper-inner" style={value === "moon" ? { backgroundColor: "#1F2A3D" } : undefined} >
      <div className="container-fluid">
        <div className="card" style={value === "moon" ? { backgroundColor: "#1A2537" } : undefined}>
          <div className="card-body">
            <h5 className="card-title fw-semibold mb-4" style={value === "moon" ? { color: "white" } : undefined}>Buttons</h5>
            <div className="card" style={value === "moon" ? { backgroundColor: "#1F2A3D" } : undefined}>
              <div className="card-body p-4">
                <button type="button" className="btn btn-primary m-1">Primary</button>
                <button type="button" className="btn btn-secondary m-1">Secondary</button>
                <button type="button" className="btn btn-success m-1">Success</button>
                <button type="button" className="btn btn-danger m-1">Danger</button>
                <button type="button" className="btn btn-warning m-1">Warning</button>
                <button type="button" className="btn btn-info m-1">Info</button>
                <button type="button" className="btn btn-light m-1">Light</button>
                <button type="button" className="btn btn-dark m-1">Dark</button>
                <button type="button" className="btn btn-link m-1">Link</button>
              </div>
            </div>
            <h5 className="card-title fw-semibold mb-4" style={value === "moon" ? { color: "white" } : undefined}>Outline buttons</h5>
            <div className="card mb-0" style={value === "moon" ? { backgroundColor: "#1F2A3D" } : undefined}>
              <div className="card-body p-4">
                <button type="button" className="btn btn-outline-primary m-1">Primary</button>
                <button type="button" className="btn btn-outline-secondary m-1">Secondary</button>
                <button type="button" className="btn btn-outline-success m-1">Success</button>
                <button type="button" className="btn btn-outline-danger m-1">Danger</button>
                <button type="button" className="btn btn-outline-warning m-1">Warning</button>
                <button type="button" className="btn btn-outline-info m-1">Info</button>
                <button type="button" className="btn btn-outline-light m-1">Light</button>
                <button type="button" className="btn btn-outline-dark m-1">Dark</button>
                <button type="button" className="btn btn-outline-link m-1">Link</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default Button;
