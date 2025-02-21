import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./assets/css/App.css";
import HomePage from "./pages";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
