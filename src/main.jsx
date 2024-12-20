import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Dashboard from "./Comps/Dashboard.jsx";
import Alerts from "./Comps/Alerts.jsx";
import Button from "./Comps/Button.jsx";
import Card from "./Comps/Card.jsx";
import Form from "./Comps/Form.jsx";
import Typography from "./Comps/Typography.jsx";
import Icon from "./Comps/Icon.jsx";
import Sample from "./Comps/Sample.jsx";
import Login from "./Comps/Login.jsx";
import Register from "./Comps/Register.jsx";
import Category from "./Comps/Category.jsx"
import Subcategory from "./Comps/Subcategory.jsx";
import Profile from "./Comps/Profile.jsx";
import store from "./app/store.js";
import { Provider } from "react-redux";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            {/*parent route */}
            <Route index element={<Dashboard />} />
            {/* Default Route */}
            {/*Below all are child routes */}
            <Route path="alert" element={<Alerts />} />
            <Route path="button" element={<Button />} />
            <Route path="category" element={<Category />} />
            <Route path="/category/:catid" element={<Category />} />
            <Route path="card" element={<Card />} />
            <Route path="form" element={<Form />} />
            <Route path="typography" element={<Typography />} />
            <Route path="icon" element={<Icon />} />
            <Route path="sample" element={<Sample />} />
            <Route path="subcategory" element={<Subcategory />} />
            <Route path="/subcategory/:searchcatid/:subcatid" element={<Subcategory />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
