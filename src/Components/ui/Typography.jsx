import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Typography = () => {
  const { value } = useSelector(state => state.toggleSlice);
  const navigate = useNavigate();
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
        <div className="card" style={value === "moon" ? { backgroundColor: "#1A2537" } : undefined}>
          <div className="card-body">
            <h5 className="card-title fw-semibold mb-4" style={value === "moon" ? { color: "white" } : undefined}>Headings</h5>
            <div className="card" style={value === "moon" ? { backgroundColor: "#1F2A3D" } : undefined}>
              <div className="card-body p-4">
                <h1 style={value === "moon" ? { color: "white" } : undefined}>h1. Bootstrap heading</h1>
                <h2 style={value === "moon" ? { color: "white" } : undefined}>h2. Bootstrap heading</h2>
                <h3 style={value === "moon" ? { color: "white" } : undefined}>h3. Bootstrap heading</h3>
                <h4 style={value === "moon" ? { color: "white" } : undefined}>h4. Bootstrap heading</h4>
                <h5 style={value === "moon" ? { color: "white" } : undefined}>h5. Bootstrap heading</h5>
                <h6 style={value === "moon" ? { color: "white" } : undefined}>h6. Bootstrap heading</h6>
              </div>
            </div>
            <h5 className="card-title fw-semibold mb-4" style={value === "moon" ? { color: "white" } : undefined}>Inline text elements</h5>
            <div className="card mb-0" style={value === "moon" ? { backgroundColor: "#1F2A3D" } : undefined}>
              <div className="card-body p-4">
                <p>You can use the mark tag to <mark>highlight</mark> text.</p>
                <p><del>This line of text is meant to be treated as deleted text.</del></p>
                <p><s>This line of text is meant to be treated as no longer accurate.</s></p>
                <p><ins>This line of text is meant to be treated as an addition to the document.</ins></p>
                <p><u>This line of text will render as underlined.</u></p>
                <p><small>This line of text is meant to be treated as fine print.</small></p>
                <p><strong>This line rendered as bold text.</strong></p>
                <p className="mb-0"><em>This line rendered as italicized text.</em></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default Typography;
