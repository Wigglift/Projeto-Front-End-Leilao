import TopMenu from "../menu/top/TopMenu";
import styles from "./Header.module.scss";
import logo from "../../assets/images/bidlive_logo.svg";
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
