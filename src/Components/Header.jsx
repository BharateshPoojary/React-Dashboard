import React, { useEffect, useState } from "react";
import user from "../assets/images/profile/user-1.jpg";
import { Icon } from "@iconify/react/dist/iconify.js";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUserCreds } from "../slice/userCredsSlice";
const Header = () => {
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

      <header className="app-header">
        <nav className="navbar navbar-expand-lg navbar-light">
          <ul className="navbar-nav">
            {/* sidebaricon starts */}
            <li className="nav-item d-block d-xl-none">
              <NavLink className="nav-link sidebartoggler " id="headerCollapse" onClick={() => { }}>
                <i className="ti ti-menu-2"></i>
              </NavLink>
            </li>
            {/* sidebaricon ends */}
            {/* bell icon starts */}
            <li className="nav-item">
              <div className="nav-link " style={{ cursor: "pointer" }} onClick={() => { }}>
                <Icon icon="solar:bell-linear" className="fs-6"></Icon>
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
                >
                  <div className="message-body">
                    <NavLink
                      to="profile"
                      className="d-flex align-items-center gap-2 dropdown-item cursor-pointer"
                    >
                      <i className="ti ti-user fs-6"></i>
                      <p className="mb-0 fs-3">My Profile</p>
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
