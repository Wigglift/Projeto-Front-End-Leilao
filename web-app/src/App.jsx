import "./assets/scss/Reset.scss";
import "./assets/scss/Common.scss";
import "./assets/scss/Container.scss";

import Header from "./components/header/Header";
import Banner from "./components/banner/Banner";

function App() {
  return (
    <div className='App'>
      <Header />
      <Banner />
    </div>
  );
}

export default App;
