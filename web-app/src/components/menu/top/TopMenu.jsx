import styles from "./TopMenu.module.scss";

export default function TopMenu({ links }) {
  return (
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
    </nav>
  );
}
