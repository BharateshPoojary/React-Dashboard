import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Alerts = () => {
  const navigate = useNavigate();
  const { value } = useSelector(state => state.toggleSlice);
  const userCreds = useSelector(state => state.userCreds);
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
    <div className="body-wrapper-inner" style={value === "moon" ? { backgroundColor: "#1F2A3D" } : undefined}>
      <div className="container-fluid">
        <div className="card" style={value === "moon" ? { backgroundColor: "#1A2537" } : undefined} >
          <div className="card-body">
            <h5 className="card-title fw-semibold mb-4" style={value === "moon" ? { color: "white" } : undefined}>Alerts</h5>
            <div className="card mb-0">
              <div className="card-body p-4" style={value === "moon" ? { backgroundColor: "#1A2537" } : undefined}>
                <div className="alert alert-primary" role="alert">
                  A simple primary alert—check it out!
                </div>
                <div className="alert alert-secondary" role="alert">
                  A simple secondary alert—check it out!
                </div>
                <div className="alert alert-success" role="alert">
                  A simple success alert—check it out!
                </div>
                <div className="alert alert-danger" role="alert">
                  A simple danger alert—check it out!
                </div>
                <div className="alert alert-warning" role="alert">
                  A simple warning alert—check it out!
                </div>
                <div className="alert alert-info" role="alert">
                  A simple info alert—check it out!
                </div>
                <div className="alert alert-light" role="alert">
                  A simple light alert—check it out!
                </div>
                <div className="alert alert-dark" role="alert">
                  A simple dark alert—check it out!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default Alerts;
