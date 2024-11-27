import React from "react";

const Icon = () => {
  return <div>
    <div className="body-wrapper-inner">
      <div className="container-fluid">
        <div className="card w-100 h-100 position-relative overflow-hidden">
          <div className="card-body">
            <h5 className="card-title fw-semibold mb-4">Icons</h5>
            <iframe src="https://tabler-icons.io/" frameborder="0" style={{ height: "calc(100vh - 250px)", width: "100%" }}
              data-simplebar=""></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default Icon;
