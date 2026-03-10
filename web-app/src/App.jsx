import "./assets/scss/Reset.scss";
import "./assets/scss/Common.scss";
import "./assets/scss/Container.scss";

import {Routes, Route} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
