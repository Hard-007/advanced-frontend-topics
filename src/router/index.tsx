import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../assets/css/App.css";
import HomePage from "../pages/";
import LoginPage from "../pages/login";
import SignupPage from "../pages/signup";
import ForgotPasswordPage from "../pages/forgotPassword";
import CreatePost from "../pages/CreatePost";
import Layout from "../components/Layout";
import PostDetails from "../pages/post/[id]";

export const RouterSetup = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouterSetup;
