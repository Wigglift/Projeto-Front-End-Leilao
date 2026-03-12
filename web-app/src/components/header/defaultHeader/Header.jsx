import { useState } from "react";

import TopMenu from "../../menu/top/TopMenu";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/bidlive_logo.svg";
import PrimaryButton from "../../primaryBtn/PrimaryBtn";
import Hamburguer from "../../menu/hamburguer/HamburguerMenu";

export default function Header() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.main}>
      <div className={`${styles.headerContainer} container`}>
        <div>
          <Link to='/'>
            <img src={logo} alt='Logo BidLive' title='Logo BidLive' />
          </Link>
        </div>
        <Hamburguer links={["Home", "Serviços", "Vantagens", "Sobre"]} isOpen={isOpen} toggleMenu={toggleMenu} />
        <TopMenu links={["Home", "Serviços", "Vantagens", "Sobre"]} />
        <div className={styles.btnContainer}>
          <Link to='/login'>
            <PrimaryButton texto='Login' />
          </Link>
        </div>
      </div>
    </header>
  );
}
