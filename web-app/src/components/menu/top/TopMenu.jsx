import styles from "./TopMenu.module.scss";
import { Link } from "react-router-dom";

export default function TopMenu({ links }) {
  return (
    <nav className={styles.navItems}>
      <ul className={styles.items}>
        {links.map((link, index) => {
          return (
            <li key={index}>
              <Link to={link.path}>{link.label}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
