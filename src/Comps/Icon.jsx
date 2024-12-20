import React from "react";
import { useSelector } from "react-redux";

const Icon = () => {
  const { value } = useSelector(state => state.toggleSlice);
  return <div>
    <div className="body-wrapper-inner" style={value === "moon" ? { backgroundColor: "#1F2A3D" } : undefined}>
      <div className="container-fluid">
        <div className="card w-100 h-100 position-relative overflow-hidden" style={value === "moon" ? { backgroundColor: "#1A2537" } : undefined}>
          <div className="card-body">
            <h5 className="card-title fw-semibold mb-4" style={value === "moon" ? { color: "white" } : undefined}>Icons</h5>
            <iframe src="https://tabler-icons.io/" style={{ height: "calc(100vh - 250px)", width: "100%" }}
              data-simplebar=""></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default Icon;
