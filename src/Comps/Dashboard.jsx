import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useEffect } from 'react'
import dashprd2 from "../assets/images/products/dash-prd-2.jpg"
import dashprd3 from "../assets/images/products/dash-prd-3.jpg"
import dashprd1 from "../assets/images/products/dash-prd-1.jpg"
import dashprd4 from "../assets/images/products/dash-prd-4.jpg"
import blogimg1 from "../assets/images/blog/blog-img1.jpg";
import blogimg2 from "../assets/images/blog/blog-img2.jpg";
import blogimg3 from "../assets/images/blog/blog-img3.jpg";
import user2 from "../assets/images/profile/user-2.jpg"
import user3 from "../assets/images/profile/user-3.jpg"
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserCreds } from '../slice/userCredsSlice'
import { fetchCategories } from '../slice/categorySlice'
import { fetchSubCategories } from '../slice/subCatSlice'
const Dashboard = () => {
  const { value } = useSelector(state => state.toggleSlice);
  const userCreds = useSelector(state => state.userCreds);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (userCreds.userId === 0 && localStorage.getItem("userCreds")) {
      const { userName, mobileNo, userId, password, success } = JSON.parse(localStorage.getItem("userCreds"));
      dispatch(updateUserCreds({ userName, mobileNo, userId, password, success }));
    }
  }, [dispatch, userCreds.userId])
  useEffect(() => {
    console.log(userCreds);
    if (userCreds.userId === 0 && !localStorage.getItem("userCreds")) {
      navigate("/login");
    }
  }, [navigate, userCreds])
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSubCategories());
  }, [])
  return (
    <div >
      <div className="body-wrapper-inner" style={value === "moon" ? { backgroundColor: "#1F2A3D" } : undefined}>
        <div className="container-fluid">
          {/* <!--  Row 1 --> */}
          <div className="row">
            <div className="col-lg-8 d-flex align-items-strech">
              <div className="card w-100" style={value === "moon" ? { backgroundColor: "#1A2537" } : undefined}>
                <div className="card-body">
                  <div className="d-sm-flex d-block align-items-center justify-content-between mb-9">
                    <div className="mb-3 mb-sm-0">
                      <h5 className="card-title fw-semibold" style={value === "moon" ? { color: "white" } : undefined}>Revenue Forecast</h5>
                    </div>
                    <div>
                      <select className="form-select" style={value === "moon" ? { backgroundColor: "#635BFF", color: "white" } : undefined}>
                        <option value="1">March 2024</option>
                        <option value="2">April 2024</option>
                        <option value="3">May 2024</option>
                        <option value="4">June 2024</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card" style={value === "moon" ? { backgroundColor: "#1A2537" } : undefined}>
                    <div className="card-body">
                      <div className="d-flex align-items-center gap-6 mb-4 pb-3">
                        <span
                          className="round-48 d-flex align-items-center justify-content-center rounded bg-secondary-subtle">
                          <Icon icon="solar:football-outline" className="fs-6 text-secondary"> </Icon>
                        </span>
                        <h6 className="mb-0 fs-4" style={value === "moon" ? { color: "white" } : undefined}>New Customers</h6>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-6" >
                        <h6 className="mb-0 fw-medium" style={value === "moon" ? { color: "white" } : undefined}>New goals</h6>
                        <h6 className="mb-0 fw-medium" style={value === "moon" ? { color: "white" } : undefined}>83%</h6>
                      </div>
                      <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25"
                        aria-valuemin="0" aria-valuemax="100" style={{ height: "7px" }}>
                        <div className="progress-bar bg-secondary" style={{ width: "83%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="card" style={value === "moon" ? { backgroundColor: "#1A2537" } : undefined}>
                    <div className="card-body">
                      <div className="d-flex align-items-center gap-6 mb-4">
                        <span
                          className="round-48 d-flex align-items-center justify-content-center rounded bg-danger-subtle">
                          <Icon icon="solar:box-linear" className="fs-6 text-danger"></Icon>
                        </span>
                        <h6 className="mb-0 fs-4" style={value === "moon" ? { color: "white" } : undefined}>Total Income</h6>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <h4 style={value === "moon" ? { color: "white" } : undefined}>$680</h4>
                          <span className="fs-11 text-success fw-semibold" >+18%</span>
                        </div>
                        <div className="col-6">
                          <div id="total-income"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!--  Row 2 --> */}
          <div className="row">
            <div className="col-lg-8 d-flex align-items-stretch">
              <div className="card w-100" style={value === "moon" ? { backgroundColor: "#1A2537" } : undefined}>
                <div className="card-body p-4">
                  <h5 className="card-title fw-semibold mb-4" style={value === "moon" ? { color: "white" } : undefined}>Revenue by Product</h5>
                  <div className="table-responsive" data-simplebar >
                    <table className="table text-nowrap align-middle table-custom mb-0">
                      <thead >
                        <tr>
                          <th scope="col" className="fw-normal ps-0" style={value === "moon" ? { backgroundColor: "#1A2537", color: "white" } : undefined}>Assigned</th>
                          <th scope="col" className="fw-normal" style={value === "moon" ? { backgroundColor: "#1A2537", color: "white" } : undefined}>Progress</th>
                          <th scope="col" className="fw-normal" style={value === "moon" ? { backgroundColor: "#1A2537", color: "white" } : undefined}>Priority</th>
                          <th scope="col" className="fw-normal" style={value === "moon" ? { backgroundColor: "#1A2537", color: "white" } : undefined}>Budget</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="ps-0" style={value === "moon" ? { backgroundColor: "#1A2537" } : undefined}>
                            <div className="d-flex align-items-center gap-6" >
                              <img src={dashprd1} alt="prd1" width="48"
                                className="rounded" />
                              <div>
                                <h6 className="mb-0" style={value === "moon" ? { color: "gray" } : undefined}>Minecraf App</h6>
                                <span>Jason Roy</span>
                              </div>
                            </div>
                          </td>
                          <td style={value === "moon" ? { backgroundColor: "#1A2537" } : undefined}>
                            <span>73.2%</span>
                          </td>
                          <td style={value === "moon" ? { backgroundColor: "#1A2537" } : undefined}>
                            <span className="badge bg-success-subtle text-success">Low</span>
                          </td>
                          <td style={value === "moon" ? { backgroundColor: "#1A2537" } : undefined}>
                            <span style={value === "moon" ? { color: "white" } : { color: "black" }}>$3.5k</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-0" style={value === "moon" ? { backgroundColor: "#1A2537" } : undefined}>
                            <div className="d-flex align-items-center gap-6">
                              <img src={dashprd2} alt="prd1" width="48"
                                className="rounded" />
                              <div>
                                <h6 className="mb-0" style={value === "moon" ? { color: "gray" } : undefined}>Web App Project</h6>
                                <span>Mathew Flintoff</span>
                              </div>
                            </div>
                          </td>
                          <td style={value === "moon" ? { backgroundColor: "#1A2537" } : undefined}>
                            <span>73.2%</span>
                          </td>
                          <td style={value === "moon" ? { backgroundColor: "#1A2537" } : undefined}>
                            <span className="badge bg-warning-subtle text-warning">Medium</span>
                          </td>
                          <td style={value === "moon" ? { backgroundColor: "#1A2537" } : undefined}>
                            <span style={value === "moon" ? { color: "white" } : { color: "black" }}>$3.5k</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-0" style={value === "moon" ? { backgroundColor: "#1A2537" } : undefined}>
                            <div className="d-flex align-items-center gap-6">
                              <img src={dashprd3} alt="prd1" width="48"
                                className="rounded" />
                              <div>
                                <h6 className="mb-0" style={value === "moon" ? { color: "gray" } : undefined}>Modernize Dashboard</h6>
                                <span>Anil Kumar</span>
                              </div>
                            </div>
                          </td>
                          <td style={value === "moon" ? { backgroundColor: "#1A2537" } : undefined}>
                            <span>73.2%</span>
                          </td>
                          <td style={value === "moon" ? { backgroundColor: "#1A2537" } : undefined}>
                            <span className="badge bg-secondary-subtle text-secondary">Very
                              High</span>
                          </td>
                          <td style={value === "moon" ? { backgroundColor: "#1A2537" } : undefined}>
                            <span style={value === "moon" ? { color: "white" } : { color: "black" }}>$3.5k</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-0" style={value === "moon" ? { backgroundColor: "#1A2537" } : undefined}>
                            <div className="d-flex align-items-center gap-6">
                              <img src={dashprd4} alt="prd1" width="48"
                                className="rounded" />
                              <div>
                                <h6 className="mb-0" style={value === "moon" ? { color: "gray" } : undefined}>Dashboard Co</h6>
                                <span>George Cruize</span>
                              </div>
                            </div>
                          </td>
                          <td style={value === "moon" ? { backgroundColor: "#1A2537" } : undefined}>
                            <span>73.2%</span>
                          </td>
                          <td style={value === "moon" ? { backgroundColor: "#1A2537" } : undefined}>
                            <span className="badge bg-danger-subtle text-danger">High</span>
                          </td>
                          <td style={value === "moon" ? { backgroundColor: "#1A2537" } : undefined}>
                            <span style={value === "moon" ? { color: "white" } : { color: "black" }}>$3.5k</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 d-flex align-items-stretch">
              <div className="card w-100" style={value === "moon" ? { backgroundColor: "#1A2537" } : undefined}>
                <div className="card-body p-4">
                  <div className="mb-4">
                    <h5 className="card-title fw-semibold" style={value === "moon" ? { color: "white" } : undefined}>Daily activities</h5>
                  </div>
                  <ul className="timeline-widget mb-0 position-relative mb-n5">
                    <li className="timeline-item d-flex position-relative overflow-hidden">
                      <div className="timeline-time mt-n1 text-muted flex-shrink-0 text-end">09:46
                      </div>
                      <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                        <span className="timeline-badge bg-primary flex-shrink-0 mt-2"></span>
                        <span className="timeline-badge-border d-block flex-shrink-0"></span>
                      </div>
                      <div className="timeline-desc fs-3 mt-n1 " style={value === "moon" ? { color: "white" } : { color: "black" }}>Payment received from John
                        Doe of $385.90</div>
                    </li>
                    <li className="timeline-item d-flex position-relative overflow-hidden">
                      <div className="timeline-time mt-n6 text-muted flex-shrink-0 text-end">09:46
                      </div>
                      <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                        <span className="timeline-badge bg-warning flex-shrink-0"></span>
                        <span className="timeline-badge-border d-block flex-shrink-0"></span>
                      </div>
                      <div className="timeline-desc fs-3  mt-n6 fw-semibold" style={value === "moon" ? { color: "white" } : { color: "black" }}>New sale
                        recorded <a onClick={() => { }} className="text-primary d-block fw-normal ">#ML-3467</a>
                      </div>
                    </li>
                    <li className="timeline-item d-flex position-relative overflow-hidden">
                      <div className="timeline-time mt-n6 text-muted flex-shrink-0 text-end">09:46
                      </div>
                      <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                        <span className="timeline-badge bg-warning flex-shrink-0"></span>
                        <span className="timeline-badge-border d-block flex-shrink-0"></span>
                      </div>
                      <div className="timeline-desc fs-3  mt-n6" style={value === "moon" ? { color: "white" } : { color: "black" }}>Payment was made of $64.95
                        to Michael</div>
                    </li>
                    <li className="timeline-item d-flex position-relative overflow-hidden">
                      <div className="timeline-time mt-n6 text-muted flex-shrink-0 text-end">09:46
                      </div>
                      <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                        <span className="timeline-badge bg-secondary flex-shrink-0"></span>
                        <span className="timeline-badge-border d-block flex-shrink-0"></span>
                      </div>
                      <div className="timeline-desc fs-3  mt-n6 fw-semibold" style={value === "moon" ? { color: "white" } : { color: "black" }}>New sale
                        recorded <a onClick={() => { }} className="text-primary d-block fw-normal ">#ML-3467</a>
                      </div>
                    </li>
                    <li className="timeline-item d-flex position-relative overflow-hidden">
                      <div className="timeline-time mt-n6 text-muted flex-shrink-0 text-end">09:46
                      </div>
                      <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                        <span className="timeline-badge bg-danger flex-shrink-0"></span>
                        <span className="timeline-badge-border d-block flex-shrink-0"></span>
                      </div>
                      <div className="timeline-desc fs-3  mt-n6 fw-semibold" style={value === "moon" ? { color: "white" } : { color: "black" }}>Project meeting
                      </div>
                    </li>
                    <li className="timeline-item d-flex position-relative overflow-hidden">
                      <div className="timeline-time mt-n6 text-muted flex-shrink-0 text-end">09:46
                      </div>
                      <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                        <span className="timeline-badge bg-primary flex-shrink-0"></span>
                      </div>
                      <div className="timeline-desc fs-3  mt-n6" style={value === "moon" ? { color: "white" } : { color: "black" }}>Payment received from John
                        Doe of $385.90</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* <!--  Row 3 --> */}
          <div className="row">
            <div className="col-lg-4">
              <div className="card overflow-hidden hover-img" style={value === "moon" ? { backgroundColor: "#1A2537" } : undefined}>
                <div className="position-relative">
                  <a onClick={() => { }}>
                    <img src={blogimg1} className="card-img-top" alt="matdash-img" />
                  </a>
                  <span
                    className="badge text-bg-light text-dark fs-2 lh-sm mb-9 me-9 py-1 px-2 fw-semibold position-absolute bottom-0 end-0">2
                    min Read</span>
                  <img src={user3} alt="matdash-img"
                    className="img-fluid rounded-circle position-absolute bottom-0 start-0 mb-n9 ms-9" width="40"
                    height="40" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Georgeanna Ramero" />
                </div>
                <div className="card-body p-4">
                  <span className="badge text-bg-light fs-2 py-1 px-2 lh-sm  mt-3">Social</span>
                  <NavLink className="d-block my-4 fs-5  fw-semibold " to="/" style={value === "moon" ? { color: "white" } : { color: "black" }}>As yen tumbles, gadget-loving
                    Japan goes
                    for secondhand iPhones</NavLink>
                  <div className="d-flex align-items-center gap-4">
                    <div className="d-flex align-items-center gap-2">
                      <i className="ti ti-eye  fs-5" style={value === "moon" ? { color: "white" } : { color: "black" }}></i>9,125
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <i className="ti ti-message-2  fs-5" style={value === "moon" ? { color: "white" } : { color: "black" }}></i>3
                    </div>
                    <div className="d-flex align-items-center fs-2 ms-auto">
                      <i className="ti ti-point " style={value === "moon" ? { color: "white" } : { color: "black" }}></i>Mon, Dec 19
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card overflow-hidden hover-img" style={value === "moon" ? { backgroundColor: "#1A2537" } : undefined}>
                <div className="position-relative">
                  <NavLink to="/" >
                    <img src={blogimg2} className="card-img-top" alt="matdash-img" />
                  </NavLink>
                  <span
                    className="badge text-bg-light text-dark fs-2 lh-sm mb-9 me-9 py-1 px-2 fw-semibold position-absolute bottom-0 end-0">2
                    min Read</span>
                  <img src={user2} alt="matdash-img"
                    className="img-fluid rounded-circle position-absolute bottom-0 start-0 mb-n9 ms-9" width="40"
                    height="40" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Georgeanna Ramero" />
                </div>
                <div className="card-body p-4">
                  <span className="badge text-bg-light fs-2 py-1 px-2 lh-sm  mt-3">Gadget</span>
                  <NavLink className="d-block my-4 fs-5  fw-semibold " to="/" style={value === "moon" ? { color: "white" } : { color: "black" }}>Intel loses bid to revive
                    antitrust case
                    against patent foe Fortress</NavLink>
                  <div className="d-flex align-items-center gap-4">
                    <div className="d-flex align-items-center gap-2">
                      <i className="ti ti-eye  fs-5" style={value === "moon" ? { color: "white" } : { color: "black" }}></i>4,150
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <i className="ti ti-message-2  fs-5" style={value === "moon" ? { color: "white" } : { color: "black" }}></i>38
                    </div>
                    <div className="d-flex align-items-center fs-2 ms-auto">
                      <i className="ti ti-point " style={value === "moon" ? { color: "white" } : { color: "black" }}></i>Sun, Dec 18
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card overflow-hidden hover-img" style={value === "moon" ? { backgroundColor: "#1A2537" } : undefined}>
                <div className="position-relative">
                  <a onClick={() => { }}>
                    <img src={blogimg3} className="card-img-top" alt="matdash-img" />
                  </a>
                  <span
                    className="badge text-bg-light text-dark fs-2 lh-sm mb-9 me-9 py-1 px-2 fw-semibold position-absolute bottom-0 end-0">2
                    min Read</span>
                  <img src={user3} alt="matdash-img"
                    className="img-fluid rounded-circle position-absolute bottom-0 start-0 mb-n9 ms-9" width="40"
                    height="40" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Georgeanna Ramero" />
                </div>
                <div className="card-body p-4">
                  <span className="badge text-bg-light fs-2 py-1 px-2 lh-sm  mt-3">Health</span>
                  <NavLink className="d-block my-4 fs-5  fw-semibold " to="/" style={value === "moon" ? { color: "white" } : { color: "black" }}>COVID outbreak deepens as more
                    lockdowns
                    loom in China</NavLink>
                  <div className="d-flex align-items-center gap-4">
                    <div className="d-flex align-items-center gap-2">
                      <i className="ti ti-eye  fs-5" style={value === "moon" ? { color: "white" } : { color: "black" }}></i>9,480
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <i className="ti ti-message-2  fs-5" style={value === "moon" ? { color: "white" } : { color: "black" }}></i>12
                    </div>
                    <div className="d-flex align-items-center fs-2 ms-auto">
                      <i className="ti ti-point " style={value === "moon" ? { color: "white" } : { color: "black" }}></i>Sat, Dec 17
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="py-6 px-6 text-center">
            <p className="mb-0 fs-4">Design and Developed by <a href="https://adminmart.com/" target="_blank"
              className="pe-1 text-primary text-decoration-underline">AdminMart.com</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard