import React from "react";
import logo from "../assets/images/logos/logo.svg";
import { Icon } from "@iconify/react/dist/iconify.js";
import rupee from "../assets/images/backgrounds/rupee.png";
import { NavLink } from "react-router-dom";

const SideBar = () => {

  return (
    <div>
      {/* Sidebar Start */}
      <aside className="left-sidebar">
        {/* Sidebar scroll */}
        <div>
          <div className="brand-logo d-flex align-items-center justify-content-between">
            <NavLink to="/" className="text-nowrap logo-img" id="">
              <img src={logo} alt="matdashlogo" />
            </NavLink>
            <div
              className="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
              id="sidebarCollapse"
            >
              <i className="ti ti-x fs-8"></i>
            </div>
          </div>
          {/* Sidebar navigation */}
          <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
            <ul id="sidebarnav">
              <li className="nav-small-cap">
                <Icon
                  icon="solar:menu-dots-linear"
                  className="nav-small-cap-icon fs-4"
                ></Icon>
                <span className="hide-menu">Home</span>
              </li>
              <li className="sidebar-item" >
                <NavLink className="sidebar-link" to="/" aria-expanded="false" >
                  <Icon icon="solar:widget-add-line-duotone"></Icon>
                  <span className="hide-menu">Dashboard</span>
                </NavLink>
              </li>
              <li>
                <span className="sidebar-divider lg"></span>
              </li>
              <li className="nav-small-cap">
                <Icon
                  icon="solar:menu-dots-linear"
                  className="nav-small-cap-icon fs-4"
                ></Icon>
                <span className="hide-menu">UI COMPONENTS</span>
              </li>
              <li className="sidebar-item"  >
                <NavLink className="sidebar-link" to="category" aria-expanded="false" >
                  <Icon icon="solar:passport-minimalistic-outline"></Icon>
                  <span className="hide-menu">Categories</span>
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink
                  className="sidebar-link"
                  to="button"
                  aria-expanded="false"
                >
                  <Icon icon="solar:layers-minimalistic-bold-duotone"></Icon>
                  <span className="hide-menu">Buttons</span>
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink className="sidebar-link" to="alert" aria-expanded="false">
                  <Icon icon="solar:danger-circle-line-duotone"></Icon>
                  <span className="hide-menu">Alerts</span>
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink className="sidebar-link" to="card" aria-expanded="false">
                  <Icon icon="solar:bookmark-square-minimalistic-line-duotone"></Icon>
                  <span className="hide-menu">Card</span>
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink className="sidebar-link" to="form" aria-expanded="false">
                  <Icon icon="solar:file-text-line-duotone"></Icon>
                  <span className="hide-menu">Forms</span>
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink
                  className="sidebar-link"
                  to="typography"
                  aria-expanded="false"
                >
                  <Icon icon="solar:text-field-focus-line-duotone"></Icon>
                  <span className="hide-menu">Typography</span>
                </NavLink>
              </li>
              <li>
                <span className="sidebar-divider lg"></span>
              </li>
              {localStorage.getItem('userCreds')} <li className="nav-small-cap">
                <Icon
                  icon="solar:menu-dots-linear"
                  className="nav-small-cap-icon fs-4"
                ></Icon>
                <span className="hide-menu">AUTH</span>
              </li>
              <li className="sidebar-item">
                <NavLink className="sidebar-link" to="login" aria-expanded="false">
                  <Icon icon="solar:login-3-line-duotone"></Icon>
                  <span className="hide-menu">Login</span>
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink
                  className="sidebar-link"
                  to="register"
                  aria-expanded="false"
                >
                  <Icon icon="solar:user-plus-rounded-line-duotone"></Icon>
                  <span className="hide-menu">Register</span>
                </NavLink>
              </li>
              <li>
                <span className="sidebar-divider lg"></span>
              </li>
              <li className="nav-small-cap">
                <Icon
                  icon="solar:menu-dots-linear"
                  className="nav-small-cap-icon fs-4"
                ></Icon>
                <span className="hide-menu">EXTRA</span>
              </li>
              <li className="sidebar-item">
                <NavLink className="sidebar-link" to="icon" aria-expanded="false">
                  <Icon icon="solar:sticker-smile-circle-2-line-duotone"></Icon>
                  <span className="hide-menu">Icons</span>
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink
                  className="sidebar-link"
                  to="sample"
                  aria-expanded="false"
                >
                  <Icon icon="solar:planet-3-line-duotone"></Icon>
                  <span className="hide-menu">Sample Page</span>
                </NavLink>
              </li>
            </ul>
            <div className="unlimited-access d-flex align-items-center hide-menu bg-primary-subtle position-relative mb-7 mt-4 p-3 rounded">
              <div className="me-2 flex-shrink-0">
                <h6 className="fw-semibold fs-4 mb-6 text-dark w-75">
                  Upgrade to pro
                </h6>
                <a
                  href="https://adminmart.com/product/matdash-bootstrap-5-admin-dashboard-template/"
                  target="_blank"
                  className="btn btn-primary fs-2 fw-semibold lh-sm"
                >
                  Buy Pro
                </a>
              </div>
              <div className="unlimited-access-img">
                <img src={rupee} alt="rupee icon" className="img-fluid" />
              </div>
            </div>
          </nav>
          {/* Sidebar navigation ends*/}
        </div>
        {/* End Sidebar scroll */}
      </aside>
      {/* Sidebar Ends */}

    </div>
  );
};

export default SideBar;
