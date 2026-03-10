import TopMenu from "../menu/top/TopMenu";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/images/bidlive_logo.svg";
import PrimaryButton from "../primaryBtn/PrimaryBtn";

export default function Header() {
  return (
    <header className={styles.main}>
      <div className={`${styles.header_container} container`}>
        <div>
          <Link to="/">
            <img src={logo} alt='Logo BidLive' title='Logo BidLive' />
          </Link>
        </div>
        <TopMenu />
        <Link to="/login">
          <PrimaryButton texto='Login' />
        </Link>
      </div>
    </header>
  );
}
