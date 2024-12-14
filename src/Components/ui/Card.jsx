import React from "react";
import headphone from "../../assets/images/products/s4.jpg"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Card = () => {
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
    <div className="body-wrapper-inner" style={value === "moon" ? { backgroundColor: "#1F2A3D" } : undefined}>
      <div className="container-fluid">
        <div className="card" style={value === "moon" ? { backgroundColor: "#1A2537" } : undefined}>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <h5 className="card-title fw-semibold mb-4" style={value === "moon" ? { color: "white" } : undefined}>Card</h5>
                <div className="card" style={value === "moon" ? { backgroundColor: "#1F2A3D" } : undefined}>
                  <img src={headphone} className="card-img-top" alt="headphoneimage" />
                  <div className="card-body">
                    <h5 className="card-title" style={value === "moon" ? { color: "white" } : undefined}>Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of
                      the
                      card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <h5 className="card-title fw-semibold mb-4" style={value === "moon" ? { color: "white" } : undefined}>Header and footer</h5>
                <div className="card" style={value === "moon" ? { backgroundColor: "#1F2A3D" } : undefined}>
                  <div className="card-header">
                    Featured
                  </div>
                  <div className="card-body">
                    <h5 className="card-title" style={value === "moon" ? { color: "white" } : undefined}>Special title treatment</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <h5 className="card-title fw-semibold mb-4" style={value === "moon" ? { color: "white" } : undefined}>Titles, text, and links</h5>
                <div className="card" style={value === "moon" ? { backgroundColor: "#1F2A3D" } : undefined}>
                  <div className="card-body">
                    <h5 className="card-title" style={value === "moon" ? { color: "white" } : undefined}>Card title</h5>
                    <h6 className="card-subtitle mb-2 text-muted" >Card subtitle</h6>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of
                      the
                      card's content.</p>
                    <a href="#" className="card-link">Card link</a>
                    <a href="#" className="card-link">Another link</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default Card;
