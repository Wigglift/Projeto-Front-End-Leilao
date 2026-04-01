import { useState } from "react";
import TopMenu from "../../menu/top/TopMenu";
import styles from "./LoggedInHeader.module.scss";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/bidlive_logo.svg";
import Hamburguer from "../../menu/hamburguer/HamburguerMenu";

const SearchIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <circle cx='11' cy='11' r='8' />
    <line x1='21' y1='21' x2='16.65' y2='16.65' />
  </svg>
);

const UserIcon = () => (
  <svg width='28' height='28' viewBox='0 0 24 24' fill='currentColor'>
    <circle cx='12' cy='8' r='4' />
    <path d='M4 20c0-4 3.6-7 8-7s8 3 8 7' />
  </svg>
);

export default function LogedInHeader() {
  const [isOpen, setIsOpen] = useState(true);
  const [search, setSearch] = useState("");

  const options = [{ label: "Leilão Live", path: "/liveAuction" }];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.main}>
      <div className={`${styles.headerContainer} container`}>
        <div className={styles.headerLeft}>
          <div>
            <Link to='/liveAuction'>
              <img src={logo} alt='Logo BidLive' title='Logo BidLive' />
            </Link>
          </div>
          <Hamburguer links={options} isOpen={isOpen} toggleMenu={toggleMenu} />
          <TopMenu links={options} />
        </div>
        <div className={styles.headerRight}>
          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon}>
              <SearchIcon />
            </span>
            <input className={styles.searchInput} type='text' placeholder='Buscar leilões, produtos...' value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className={styles.btnContainer}>
            <Link to='/profile'>
              <div className={styles.userIcon}>
                <UserIcon />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
