import React from "react";
import user from "../assets/images/profile/user-1.jpg";
import { Icon } from "@iconify/react/dist/iconify.js";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUserCreds } from "../slice/userCredsSlice";
import { darkTheme, lightTheme } from "../slice/toggleSlice";

const Header = () => {
  const toggleTheme = useSelector(state => state.toggleSlice);
  const { value } = toggleTheme;
  const dispatch = useDispatch();
  const userCreds = useSelector(state => state.userCreds);//selecting userCreds state
  // const { userName } = JSON.parse(localStorage.getItem("userCreds"))
  // const [username, setUserName] = useState(userCreds.userName);
  const navigate = useNavigate();
  // useEffect(() => {
  //   const storedUserCreds = localStorage.getItem('userCreds');
  //   if (storedUserCreds) {
  //     try {
  //       const { userName } = JSON.parse(storedUserCreds);
  //       setUserName(userName);
  //     } catch (error) {
  //       console.error('Error parsing userCreds from localStorage', error);
  //     }
  //   }
  // }, [])
  const handleLogout = () => {
    localStorage.removeItem("userCreds");
    dispatch(updateUserCreds({ userName: "", mobileNo: "", userId: 0, password: "", success: 0 }));

    navigate("/login");
  }
  return (
    <div >
      <div className="modal fade show" id="exampleModal" tabIndex="-1" style={{ display: "block" }} aria-modal="true" role="dialog">
        <div className="modal-dialog modal-dialog-scrollable modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-bottom">
              <input type="search" className="form-control" placeholder="Search here" id="search" />
              <a data-bs-dismiss="modal" className="lh-1">
                <i className="ti ti-x fs-5 ms-3"></i>
              </a>
            </div>
            <div className="modal-body message-body simplebar-scrollable-y" data-simplebar="init">
              <div className="simplebar-wrapper" style={{ margin: "-16px" }}>
                <div className="simplebar-height-auto-observer-wrapper">
                  <div className="simplebar-height-auto-observer">
                  </div>
                </div>
                <div className="simplebar-mask">
                  <div className="simplebar-offset" style={{ right: "0px", bottom: "0px" }}>
                    <div className="simplebar-content-wrapper" tabIndex="0" role="region" aria-label="scrollable content" style={{ height: "auto", overflow: "hidden scroll" }}>
                      <div className="simplebar-content" style={{ padding: "16px" }}>
                        <h5 className="mb-0 fs-5 p-1">Quick Page Links</h5>
                        <ul className="list mb-0 py-2">
                          <li className="p-1 mb-1 bg-hover-light-black rounded px-2">
                            <a >
                              <span className="text-dark fw-semibold d-block">Analytics</span>
                              <span className="fs-2 d-block text-body-secondary">/dashboards/dashboard1</span>
                            </a>
                          </li>
                          <li className="p-1 mb-1 bg-hover-light-black rounded px-2">
                            <a >
                              <span className="text-dark fw-semibold d-block">eCommerce</span>
                              <span className="fs-2 d-block text-body-secondary">/dashboards/dashboard2</span>
                            </a>
                          </li>
                          <li className="p-1 mb-1 bg-hover-light-black rounded px-2">
                            <a >
                              <span className="text-dark fw-semibold d-block">CRM</span>
                              <span className="fs-2 d-block text-body-secondary">/dashboards/dashboard3</span>
                            </a>
                          </li>
                          <li className="p-1 mb-1 bg-hover-light-black rounded px-2">
                            <a >
                              <span className="text-dark fw-semibold d-block">Contacts</span>
                              <span className="fs-2 d-block text-body-secondary">/apps/contacts</span>
                            </a>
                          </li>
                          <li className="p-1 mb-1 bg-hover-light-black rounded px-2">
                            <a >
                              <span className="text-dark fw-semibold d-block">Posts</span>
                              <span className="fs-2 d-block text-body-secondary">/apps/blog/posts</span>
                            </a>
                          </li>
                          <li className="p-1 mb-1 bg-hover-light-black rounded px-2">
                            <a >
                              <span className="text-dark fw-semibold d-block">Detail</span>
                              <span className="fs-2 d-block text-body-secondary">/apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow</span>
                            </a>
                          </li>
                          <li className="p-1 mb-1 bg-hover-light-black rounded px-2">
                            <a >
                              <span className="text-dark fw-semibold d-block">Shop</span>
                              <span className="fs-2 d-block text-body-secondary">/apps/ecommerce/shop</span>
                            </a>
                          </li>
                          <li className="p-1 mb-1 bg-hover-light-black rounded px-2">
                            <a >
                              <span className="text-dark fw-semibold d-block">Modern</span>
                              <span className="fs-2 d-block text-body-secondary">/dashboards/dashboard1</span>
                            </a>
                          </li>
                          <li className="p-1 mb-1 bg-hover-light-black rounded px-2">
                            <a>
                              <span className="text-dark fw-semibold d-block">Dashboard</span>
                              <span className="fs-2 d-block text-body-secondary">/dashboards/dashboard2</span>
                            </a>
                          </li>
                          <li className="p-1 mb-1 bg-hover-light-black rounded px-2">
                            <a >
                              <span className="text-dark fw-semibold d-block">Contacts</span>
                              <span className="fs-2 d-block text-body-secondary">/apps/contacts</span>
                            </a>
                          </li>
                          <li className="p-1 mb-1 bg-hover-light-black rounded px-2">
                            <a >
                              <span className="text-dark fw-semibold d-block">Posts</span>
                              <span className="fs-2 d-block text-body-secondary">/apps/blog/posts</span>
                            </a>
                          </li>
                          <li className="p-1 mb-1 bg-hover-light-black rounded px-2">
                            <a >
                              <span className="text-dark fw-semibold d-block">Detail</span>
                              <span className="fs-2 d-block text-body-secondary">/apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow</span>
                            </a>
                          </li>
                          <li className="p-1 mb-1 bg-hover-light-black rounded px-2">
                            <a >
                              <span className="text-dark fw-semibold d-block">Shop</span>
                              <span className="fs-2 d-block text-body-secondary">/apps/ecommerce/shop</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="simplebar-placeholder" style={{ width: "500px", height: "743px" }}>
                </div>
              </div>
              <div className="simplebar-track simplebar-horizontal" style={{ visibility: "hidden" }} >
                <div className="simplebar-scrollbar" style={{ width: "0px", display: "none" }}>
                </div>
              </div>
              <div className="simplebar-track simplebar-vertical" style={{ visibility: "visible" }}>
                <div className="simplebar-scrollbar" style={{ height: "174px", display: "block", transform: "translate3d(0px, 0px, 0px)" }}>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <header className="app-header" style={value === "moon" ? { backgroundColor: "#1A2537" } : undefined}>
        <nav className="navbar navbar-expand-lg navbar-light">
          <ul className="navbar-nav">
            {/* sidebaricon starts */}
            <li className="nav-item d-block d-xl-none">
              <NavLink className="nav-link sidebartoggler " id="headerCollapse" onClick={() => { }}>
                <i className="ti ti-menu-2" style={value === "moon" ? { color: "white" } : undefined}></i>
              </NavLink>
            </li>
            {/* sidebaricon ends */}
            {/* bell icon starts */}
            <li className="nav-item">
              <div className="nav-link " style={{ cursor: "pointer" }} onClick={() => { }}>
                <Icon icon="solar:bell-linear" className="fs-6" style={value === "moon" ? { color: "white" } : undefined}></Icon>
                <div className="notification bg-primary rounded-circle"></div>
              </div>
            </li>
            {/* bell icon ends */}
          </ul>
          <div
            className="navbar-collapse justify-content-end px-0"
            id="navbarNav"
          >
            <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
              {/* user icon starts*/}
              <li className="nav-item">
                <a className="nav-link moon dark-layout nav-icon-hover-bg rounded-circle" style={value === "sun" ? { display: "flex", cursor: "pointer" } : { display: "none", cursor: "pointer" }} onClick={() => { dispatch(darkTheme()) }}>
                  <Icon icon="solar:moon-line-duotone" className="moon fs-6" style={value === "sun" ? { display: "flex", cursor: "pointer" } : { display: "none", cursor: "pointer" }} />
                </a>
                <a className="nav-link sun light-layout nav-icon-hover-bg rounded-circle" style={value === "sun" ? { display: "none", cursor: "pointer" } : { display: "flex", cursor: "pointer" }} onClick={() => { dispatch(lightTheme()) }}>
                  <Icon icon="solar:sun-2-line-duotone" className="sun fs-6" style={value === "sun" ? { display: "none", cursor: "pointer" } : { display: "flex", cursor: "pointer", color: "white" }} />
                </a>
              </li>
              <li className="nav-item d-block ">
                <a className="nav-link nav-icon-hover-bg rounded-circle" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ cursor: "pointer" }}>
                  <Icon icon="solar:magnifer-line-duotone" className="fs-6" style={value === "moon" ? { color: "white" } : { color: "black" }}></Icon>
                </a>
              </li>
              <p className="fw-semibold text-primary  fs-4 " >Welcome,{userCreds.userName}</p>

              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link"
                  onClick={() => { }}
                  id="drop2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={user}
                    alt="usericon"
                    width="35"
                    height="35"
                    className="rounded-circle"
                  />
                </NavLink>
                <div
                  className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up"
                  aria-labelledby="drop2"
                  style={value === "moon" ? { backgroundColor: "#1F2A3D" } : undefined}
                >
                  <div className="message-body" >
                    <NavLink
                      to="profile"
                      className="d-flex align-items-center gap-2 dropdown-item cursor-pointer"
                      style={value === "moon" ? { backgroundColor: "#1F2A3D" } : undefined}
                    >
                      <i className="ti ti-user fs-6" style={value === "moon" ? { color: "white" } : undefined}></i>
                      <p className="mb-0 fs-3" style={value === "moon" ? { color: "white" } : undefined}>My Profile</p>
                    </NavLink>
                    <a
                      onClick={handleLogout}
                      className="btn btn-outline-primary mx-3 mt-2 d-block"
                    >
                      Logout
                    </a>
                  </div>
                </div>
              </li>
              {/* user icon ends*/}
            </ul>
          </div>
        </nav>
      </header>

    </div>
  );
};

export default Header;
