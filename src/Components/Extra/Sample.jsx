import React from "react";
import { useSelector } from "react-redux";

const Sample = () => {
  const { value } = useSelector(state => state.toggleSlice);
  return <div>
    <div className="body-wrapper-inner" style={value === "moon" ? { backgroundColor: "#1F2A3D" } : undefined} >
      <div className="container-fluid">
        <div className="card" style={value === "moon" ? { backgroundColor: "#1A2537" } : undefined}>
          <div className="card-body">
            <h5 className="card-title fw-semibold mb-4" style={value === "moon" ? { color: "white" } : undefined}>Sample Page</h5>
            <p className="mb-0" style={value === "moon" ? { color: "white" } : undefined}>This is a sample page </p>
          </div>
        </div>
      </div>
    </div></div>;
};

export default Sample;
