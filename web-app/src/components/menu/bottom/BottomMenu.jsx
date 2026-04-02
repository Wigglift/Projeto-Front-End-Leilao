import styles from "./BottomMenu.module.scss";

export default function BottomMenu({ links }) {
  return (
    <nav>
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
