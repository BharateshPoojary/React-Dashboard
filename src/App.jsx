import { Outlet } from "react-router-dom";
import Header from "./Components/Header.jsx";
import Mainwrapper from "./Components/Mainwrapper.jsx";
import SideBar from "./Components/SideBar.jsx";
import { useSelector } from "react-redux";
import { useEffect } from "react";
function App() {
  const { value } = useSelector(state => state.toggleSlice);
  useEffect(() => {
    // Apply conditional styles to the body
    if (value === "moon") {
      document.body.style.backgroundColor = "#1A2537";
    } else {
      document.body.style.backgroundColor = ""; // Reset style if condition is not met
    }
    // Cleanup on unmount
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [value]); // Dependency array ensures the effect runs when `value` changes
  return (
    <>
      <Mainwrapper>
        <SideBar />
        {/* <!--  Main wrapper --> */}
        <div className="body-wrapper ">
          <Header />
          <Outlet />
          {/*To render child routes */}
        </div>
      </Mainwrapper>
    </>
  );
}

export default App;
