import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Dashboard from "./Components/Dashboard.jsx";
import Alerts from "./Components/ui/Alerts.jsx";
import Button from "./Components/ui/Button.jsx";
import Card from "./Components/ui/Card.jsx";
import Form from "./Components/ui/Form.jsx";
import Typography from "./Components/ui/Typography.jsx";
import Icon from "./Components/Extra/Icon.jsx";
import Sample from "./Components/Extra/Sample.jsx";
import Login from "./Components/authentication/Login.jsx";
import Register from "./Components/authentication/Register.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          {/*parent route */}
          <Route index element={<Dashboard />} />
          {/* Default Route */}
          <Route path="alert" element={<Alerts />} />
          {/*Below all are child routes */}
          <Route path="button" element={<Button />} />
          <Route path="card" element={<Card />} />
          <Route path="form" element={<Form />} />
          <Route path="typography" element={<Typography />} />
          <Route path="icon" element={<Icon />} />
          <Route path="sample" element={<Sample />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
