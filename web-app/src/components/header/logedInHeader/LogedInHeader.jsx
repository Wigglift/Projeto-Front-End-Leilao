import { useState } from "react";

import TopMenu from "../../menu/top/TopMenu";
import styles from "./LogedInHeader.module.scss";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/bidlive_logo.svg";
import PrimaryButton from "../../primaryBtn/PrimaryBtn";
import Hamburguer from "../../menu/hamburguer/HamburguerMenu";

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const UserIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);

export default function LogedInHeader() {
  const [isOpen, setIsOpen] = useState(true);
  const [search, setSearch] = useState("");

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
        <Hamburguer links={["Leilão Live", "Tipos", "Cidades"]} isOpen={isOpen} toggleMenu={toggleMenu} />
        <TopMenu links={["Leilão Live", "Tipos", "Cidades"]} />
        <div className={styles.search_wrapper}>
          <span className={styles.search_icon}><SearchIcon /></span>
          <input
            className={styles.search_input}
            type="text"
            placeholder="Buscar leilões, produtos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.btnContainer}>
          <Link to='/'>
            <div className={styles.user_icon}>
              <UserIcon />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
