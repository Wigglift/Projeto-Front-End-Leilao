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
  const options = [
    { label: "Home", path: "/liveAuction" },
    { label: "Serviços", path: "/" },
    { label: "Vantagens", path: "/" },
    { label: "Sobre", path: "/" },
  ];

  return (
    <header className={styles.main}>
      <div className={`${styles.headerContainer} container`}>
        <div>
          <Link to='/'>
            <img src={logo} alt='Logo BidLive' title='Logo BidLive' />
          </Link>
        </div>
        <Hamburguer links={options} isOpen={isOpen} toggleMenu={toggleMenu} />
        <TopMenu links={options} />
        <div className={styles.btnContainer}>
          <PrimaryButton texto='Login' destino='/login' />
        </div>
      </div>
    </header>
  );
}
