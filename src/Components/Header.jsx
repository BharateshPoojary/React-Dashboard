import React from "react";
import user from "../assets/images/profile/user-1.jpg";
import { Icon } from "@iconify/react/dist/iconify.js";
import Dashboard from "./Dashboard";
const Header = () => {
  return (
    <div >
      {/* <!--  Main wrapper --> */}
      <div className="body-wrapper">
        <header className="app-header">
          <nav className="navbar navbar-expand-lg navbar-light">
            <ul className="navbar-nav">
              {/* sidebaricon starts */}
              <li className="nav-item d-block d-xl-none">
                <a
                  className="nav-link sidebartoggler "
                  id="headerCollapse"
                  href=""
                >
                  <i className="ti ti-menu-2"></i>
                </a>
              </li>
              {/* sidebaricon ends */}
              {/* bell icon starts */}
              <li className="nav-item">
                <a className="nav-link " href="">
                  <Icon icon="solar:bell-linear" className="fs-6"></Icon>
                  <div className="notification bg-primary rounded-circle"></div>
                </a>
              </li>
              {/* bell icon ends */}
            </ul>

            <div
              className="navbar-collapse justify-content-end px-0"
              id="navbarNav"
            >
              <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
                {/* download free button starts*/}
                <a
                  href="https://adminmart.com/product/matdash-free-bootstrap-5-admin-dashboard-template/"
                  target="_blank"
                  className="btn btn-primary"
                >
                  Download Free
                </a>
                {/* download free button ends*/}
                {/* user icon starts*/}
                <li className="nav-item dropdown">
                  <a
                    className="nav-link "
                    href=""
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
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up"
                    aria-labelledby="drop2"
                  >
                    <div className="message-body">
                      <a
                        href=""
                        className="d-flex align-items-center gap-2 dropdown-item"
                      >
                        <i className="ti ti-user fs-6"></i>
                        <p className="mb-0 fs-3">My Profile</p>
                      </a>
                      <a
                        href=""
                        className="d-flex align-items-center gap-2 dropdown-item"
                      >
                        <i className="ti ti-mail fs-6"></i>
                        <p className="mb-0 fs-3">My Account</p>
                      </a>
                      <a
                        href=""
                        className="d-flex align-items-center gap-2 dropdown-item"
                      >
                        <i className="ti ti-list-check fs-6"></i>
                        <p className="mb-0 fs-3">My Task</p>
                      </a>
                      <a
                        href=""
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
        <Dashboard />
      </div>
    </div>
  );
};

export default Header;
