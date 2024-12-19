import React, { useEffect, useState } from "react";
import user from "../assets/images/profile/user-1.jpg";
import { Icon } from "@iconify/react/dist/iconify.js";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUserCreds } from "../slice/userCredsSlice";
import { darkTheme, lightTheme } from "../slice/toggleSlice";
import SearchContent from "./ui/searchContent";
import { checkRouteMatch } from "../slice/routeSlice";
import { handleSearchInput } from "../slice/searchInputSlice";

const Header = () => {
  const toggleTheme = useSelector(state => state.toggleSlice);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const { matchedRoutes } = useSelector(state => state.routeSlice);
  const { availableCategories } = useSelector((state) => state.categorySlice);
  const { availableSubCategories } = useSelector((state) => state.subCategorySlice);
  const { inputValue } = useSelector((state) => state.searchInputSlice);
  const [arrayRoutes, setArrayRoutes] = useState([]);
  const [categoriesMatched, setCategoriesMatched] = useState([]);
  const [subCategoriesMatched, setSubCategoriesMatched] = useState([]);
  const { value } = toggleTheme;
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);
  const [searchInput, setSearchInput] = useState('');
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
  const availableCatNamesWithCatId = availableCategories.map((eachcategory) => ({ catName: eachcategory.catName, catId: eachcategory.catId }))
  const matchInputValuewithCategory = () => {
    const converttoLWCase = inputValue.toLowerCase();
    const catnamesavailable = availableCatNamesWithCatId.filter(
      (eachcatNameandId) => eachcatNameandId.catName.toLowerCase().includes(converttoLWCase)
    );//It will return me an array of catname and id not onlt catname as I provided the array of object consisting both catname and catId
    setCategoriesMatched(catnamesavailable)
    console.log("Matched Categories:", catnamesavailable);
    console.log("All Category Names and Id:", availableCatNamesWithCatId);
    console.log("Available Categories from Redux:", availableCategories);
  }

  const availableSubCatNamesWithSubCatId = availableSubCategories.map((eachsubcategory) => ({ subCatName: eachsubcategory.subCatName, catId: eachsubcategory.catId, subCatId: eachsubcategory.subCatId }))
  const matchInputValuewithSubCategory = () => {
    const converttoLWCase = inputValue.toLowerCase();
    const subCatNamesAvailable = availableSubCatNamesWithSubCatId.filter(
      (eachSubCatNameandId) => eachSubCatNameandId.subCatName.toLowerCase().includes(converttoLWCase)
    );
    setSubCategoriesMatched(subCatNamesAvailable)
    console.log("Matched Sub Categories:", subCatNamesAvailable);
    console.log("All Sub Category Names and Id:", availableSubCatNamesWithSubCatId);
    console.log("Available  Sub Categories from Redux:", availableSubCategories);
  }
  useEffect(() => {
    if (availableCategories.length > 0) {
      matchInputValuewithCategory();
    }
    if (availableSubCategories.length > 0) {
      matchInputValuewithSubCategory();
    }
  }, [inputValue])

  useEffect(() => {
    console.log(matchedRoutes);
    setArrayRoutes(matchedRoutes || []);
  }, [matchedRoutes])

  const handleChange = (e) => {
    setSearchInput(e.target.value);
    console.log("current value", e.target.value);//current value vee
    setIsFirstVisit(false);
    console.log("current search input", searchInput);//current value ve some delay when used state value 
    // dispatch(checkRouteMatch(searchInput));states are asynchronous which means when  we update the input value state using e.target.value it takes some time to update because of which the delay behaviour is faced 
    dispatch(checkRouteMatch(e.target.value));//so to avoid this write e.target.value so that it will get current input value 
    dispatch(handleSearchInput(e.target.value));
  }
  // dispatch(checkRouteMatch(e.target.value));
  // dispatch(handleSearchInput(e.target.value)); 
  //we can wrap the above in a debounce function to optimize our app so that for each change it will not make a request to backend
  const handleLogout = () => {
    localStorage.removeItem("userCreds");
    dispatch(updateUserCreds({ userName: "", mobileNo: "", userId: 0, password: "", success: 0 }));
    navigate("/login");
  }
  return (
    <div >
      <header className="app-header" style={value === "moon" ? { backgroundColor: "#1A2537" } : undefined}>
        <nav className="navbar navbar-expand-lg  navbar-light ">
          <ul className="navbar-nav  ">
            {/* sidebaricon starts */}
            <li className="nav-item d-block d-xl-none">
              <NavLink className="nav-link sidebartoggler " id="headerCollapse" onClick={() => { }}>
                <i className="ti ti-menu-2" style={value === "moon" ? { color: "white" } : undefined}></i>
              </NavLink>
            </li>
            {/* sidebaricon ends
            {/* bell icon starts */}
            <li className="nav-item">
              <div className="nav-link " style={{ cursor: "pointer" }} onClick={() => { }}>
                <Icon icon="solar:bell-linear" className="fs-5 " style={value === "moon" ? { color: "white" } : undefined}></Icon>
                <div className="notification bg-primary rounded-circle"></div>
              </div>
            </li>
            {/* bell icon ends */}
          </ul>

          <ul className="navbar-nav ms-auto">
            {/* user icon starts*/}
            <li className="nav-item">
              <a className="nav-link moon dark-layout nav-icon-hover-bg rounded-circle" style={value === "sun" ? { display: "flex", cursor: "pointer" } : { display: "none", cursor: "pointer" }} onClick={() => { dispatch(darkTheme()) }}>
                <Icon icon="solar:moon-line-duotone" className="moon fs-5" style={value === "sun" ? { display: "flex", cursor: "pointer" } : { display: "none", cursor: "pointer" }} />
              </a>
              <a className="nav-link sun light-layout nav-icon-hover-bg rounded-circle" style={value === "sun" ? { display: "none", cursor: "pointer" } : { display: "flex", cursor: "pointer" }} onClick={() => { dispatch(lightTheme()) }}>
                <Icon icon="solar:sun-2-line-duotone" className="sun fs-5" style={value === "sun" ? { display: "none", cursor: "pointer" } : { display: "flex", cursor: "pointer", color: "white" }} />
              </a>
            </li>
            <li className="nav-item d-block">
              <a className="nav-link nav-icon-hover-bg rounded-circle" style={{ cursor: "pointer" }} onClick={openModal}>
                <Icon icon="solar:magnifer-line-duotone" className="fs-5" style={value === "moon" ? { color: "white" } : { color: "black" }}></Icon>
              </a>
            </li>

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


        </nav>
      </header>

      {isModalVisible && <div id="view" className={`modal ${isModalVisible ? "fade show" : "fade"}`}
        style={{ display: isModalVisible ? "block" : "none" }} tabIndex="-1" {...(isModalVisible ? { "aria-modal": true, role: "dialog" } : { "aria-hidden": true })}>
        <div className="modal-dialog modal-dialog-scrollable modal-lg modal-dialog-centered" >
          <div className="modal-content" style={value === "moon" ? { backgroundColor: "#1F2A3D" } : undefined}>
            <div className="modal-header border-bottom">
              <input type="search" className={'form-control'} autoComplete="off" placeholder="Search here" id="search" onChange={(e) => { handleChange(e) }} value={searchInput} style={value === "moon" ? { color: "white" } : undefined} />
              <a className="lh-1" onClick={closeModal}>
                <i className="ti ti-x fs-5 ms-3" style={value === "moon" ? { color: "white" } : undefined}></i>
              </a>
            </div>
            <div className="modal-body message-body " data-simplebar="init">
              <div style={{ padding: "16px", height: "300px", maxHeight: "300px", overflowY: "scroll" }}>
                {isFirstVisit ?
                  (
                    // Welcome message on the first visit
                    <div>
                      <h5 className="mb-0 fs-5 p-1 text-center" style={value === "moon" ? { color: "white" } : undefined}>Welcome!</h5>
                      <p className="text-center fs-4" style={value === "moon" ? { color: "white" } : undefined}>Start by searching for routes or categories.</p>
                    </div>
                  )
                  : (
                    <>
                      {arrayRoutes.length > 0 && (
                        <>
                          <h5 className="mb-0 fs-5 p-1" style={value === "moon" ? { color: "white" } : undefined}>Quick Page Links</h5>
                          <ul className="list mb-0 py-2">
                            {arrayRoutes.map((route, index) => (<SearchContent key={index} routes={route} closeModal={closeModal} />))}
                          </ul>
                        </>
                      )}
                      {categoriesMatched.length > 0 && (
                        <>
                          <h5 className="mb-0 fs-5 p-1" style={value === "moon" ? { color: "white" } : undefined}> Available Categories</h5>
                          <ul className="list mb-0 py-2">
                            {categoriesMatched.map((catnamesandids, index) => (<SearchContent key={index} catnamesandids={catnamesandids} closeModal={closeModal} />))}
                          </ul>
                        </>
                      )}
                      {subCategoriesMatched.length > 0 && (
                        <>
                          <h5 className="mb-0 fs-5 p-1" style={value === "moon" ? { color: "white" } : undefined}> Available  Sub Categories</h5>
                          <ul className="list mb-0 py-2">
                            {subCategoriesMatched.map((subcatnamesandids, index) => (<SearchContent key={index} subcatnamesandids={subcatnamesandids} closeModal={closeModal} />))}
                          </ul>
                        </>
                      )}
                      {arrayRoutes.length === 0 && categoriesMatched.length === 0 && subCategoriesMatched.length === 0 && (<SearchContent Noresultmessage="No result found" />)}
                    </>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
};

export default Header;
