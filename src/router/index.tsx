import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages";
import CreatePost from "../pages/CreatePost";
import Layout from "../components/Layout";
import "../assets/css/App.css";
import PostDetails from "../pages/post/[id]";

export const RouterSetup = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouterSetup;
