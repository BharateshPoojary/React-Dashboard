import { Outlet } from "react-router-dom";
import Header from "./Components/Header.jsx";
import Mainwrapper from "./Components/Mainwrapper.jsx";
import SideBar from "./Components/SideBar.jsx";

function App() {
  return (
    <>
      <Mainwrapper>
        <SideBar />
        {/* <!--  Main wrapper --> */}
        <div className="body-wrapper">
          <Header />
          <Outlet />
          {/*To render child routes */}
        </div>
      </Mainwrapper>
    </>
  );
}

export default App;
