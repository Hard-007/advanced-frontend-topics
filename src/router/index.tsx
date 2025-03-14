import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../assets/css/App.css";
import HomePage from "../pages/";
import LoginPage from "../pages/auth/login";
import SignupPage from "../pages/auth/signup";
import ForgotPasswordPage from "../pages/auth/forgotPassword";
import CreatePost from "../pages/post/create";
import EditPost from "../pages/post/edit/[id]";
import ReadPost from "../pages/post/[id]";
import Layout from "../components/Layout";

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
          <Route path="/post/:id" element={<ReadPost />} />
          <Route path="/post/edit/:id" element={<EditPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouterSetup;
