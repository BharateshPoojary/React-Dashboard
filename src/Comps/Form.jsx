import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Form = () => {
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
            <h5 className="card-title fw-semibold mb-4" style={value === "moon" ? { color: "white" } : undefined}>Forms</h5>
            <div className="card" style={value === "moon" ? { backgroundColor: "#1F2A3D" } : undefined}>
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label" style={value === "moon" ? { color: "white" } : undefined}>Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label" style={value === "moon" ? { color: "white" } : undefined}>Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                  </div>
                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
            <h5 className="card-title fw-semibold mb-4" style={value === "moon" ? { color: "white" } : undefined}>Disabled forms</h5>
            <div className="card mb-0" style={value === "moon" ? { backgroundColor: "#1F2A3D" } : undefined}>
              <div className="card-body">
                <form>
                  <fieldset disabled>
                    <legend>Disabled fieldset example</legend>
                    <div className="mb-3">
                      <label htmlFor="disabledTextInput" className="form-label" style={value === "moon" ? { color: "white" } : undefined}>Disabled input</label>
                      <input type="text" id="disabledTextInput" className="form-control" placeholder="Disabled input" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="disabledSelect" className="form-label" style={value === "moon" ? { color: "white" } : undefined}>Disabled select menu</label>
                      <select id="disabledSelect" className="form-select">
                        <option>Disabled select</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="disabledFieldsetCheck" disabled />
                        <label className="form-check-label" htmlFor="disabledFieldsetCheck">
                          Can't check this
                        </label>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default Form;
