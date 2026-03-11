import styles from "./HamburguerMenu.module.scss";
import PrimaryBtn from "../../primaryBtn/PrimaryBtn";
import HamburguerIcon from "../../../assets/images/hamburguer_icon.svg";
import CloseHamburguerIcon from "../../../assets/images/close_hamburguer_icon.svg";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/bidlive_logo.svg";

export default function Hamburguer({ links, isOpen, toggleMenu }) {
  return (
    <div className={styles.menu}>
      <a className={styles.menuHamburger} onClick={toggleMenu}>
        <img src={HamburguerIcon} />
      </a>
      <div className={`${styles.menuWrap} ${isOpen ? styles.menuWrapHide : ""}`}>
        <div className={styles.hamburguerTop}>
          <Link to='/'>
            <img src={logo} alt='Logo BidLive' title='Logo BidLive' />
          </Link>

          <div className={styles.menuHamburger} onClick={toggleMenu}>
            <a>
              <img src={CloseHamburguerIcon} />
            </a>
          </div>
        </div>
        <nav className={styles.navItems}>
          <ul className={styles.items}>
            {links.map((link, index) => {
              return (
                <li key={index}>
                  <a href=''>{link}</a>
                </li>
              );
            })}
          </ul>
          <div className={styles.btnContainer}>
            <Link to='/login'>
              <PrimaryBtn texto='Login' />
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
