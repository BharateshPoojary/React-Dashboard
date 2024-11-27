import React from "react";

const Form = () => {
  return <div>
    <div className="body-wrapper-inner">
      <div className="container-fluid">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title fw-semibold mb-4">Forms</h5>
            <div className="card">
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                  </div>
                  <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                  </div>
                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1">Check me out</label>
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
            <h5 className="card-title fw-semibold mb-4">Disabled forms</h5>
            <div className="card mb-0">
              <div className="card-body">
                <form>
                  <fieldset disabled>
                    <legend>Disabled fieldset example</legend>
                    <div className="mb-3">
                      <label for="disabledTextInput" className="form-label">Disabled input</label>
                      <input type="text" id="disabledTextInput" className="form-control" placeholder="Disabled input" />
                    </div>
                    <div className="mb-3">
                      <label for="disabledSelect" className="form-label">Disabled select menu</label>
                      <select id="disabledSelect" className="form-select">
                        <option>Disabled select</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="disabledFieldsetCheck" disabled />
                        <label className="form-check-label" for="disabledFieldsetCheck">
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
