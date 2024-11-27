import { Outlet } from "react-router-dom";
import Header from "./Components/Header.jsx";
import Mainwrapper from "./Components/Mainwrapper.jsx";
import SideBar from "./Components/SideBar.jsx";

function App() {
  return (
    <>
      <Mainwrapper>
        <Header />
        <SideBar />
        <Outlet />
        {/*To render child routes */}
      </Mainwrapper>
    </>
  );
}

export default App;
