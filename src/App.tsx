import "./assets/css/App.css";
import { RouterSetup } from "./router";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <RouterSetup />
    </div>
  );
};

export default App;
