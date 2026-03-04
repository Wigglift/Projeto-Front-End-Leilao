import "./Assets/Scss/Reset.scss";
import "./Assets/Scss/Common.scss";
import "./Assets/Scss/Container.scss";

import Header from "./Components/Header/Header";
import Banner from "./Components/banner/Banner";

function App() {
  return (
    <div className='App'>
      <Header />
      <Banner />
    </div>
  );
}

export default App;
