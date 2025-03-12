import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages";
import LoginPage from "../pages/login";
//import ResetPage from "../pages/reset";
import SignupPage from "../pages/signup";
import "../assets/css/App.css";

export const RouterSetup = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/reset" element={<ResetPage />} /> */}
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterSetup;
