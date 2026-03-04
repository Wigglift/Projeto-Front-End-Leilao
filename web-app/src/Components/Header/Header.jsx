import LoginButton from "../LoginButton/LoginButton";
import TopMenu from "../Menu/Top/TopMenu";
import styles from "./Header.module.scss";
import logo from "../../Assets/Images/bidlive_logo.svg";
import PrimaryButton from "../primaryBtn/PrimaryBtn";

export default function Header() {
  return (
    <header className={styles.main}>
      <div className={`${styles.header_container} container`}>
        <div>
          <a href=''>
            <img src={logo} alt='Logo BidLive' title='Logo BidLive' />
          </a>
        </div>
        <TopMenu />
        <PrimaryButton texto='Login' />
      </div>
    </header>
  );
}
