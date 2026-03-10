import "./assets/scss/Reset.scss";
import "./assets/scss/Common.scss";
import "./assets/scss/Container.scss";

import {Routes, Route} from "react-router-dom";
import Home from "./pages/home/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
