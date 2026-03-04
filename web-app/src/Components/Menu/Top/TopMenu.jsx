import styles from "./TopMenu.module.scss";

export default function TopMenu() {
  return (
    <nav>
      <ul className={styles.items}>
        <li>
          <a href=''>Home</a>
        </li>
        <li>
          <a href=''>Serviços</a>
        </li>
        <li>
          <a href=''>Vantagens</a>
        </li>
        <li>
          <a href=''>Sobre</a>
        </li>
      </ul>
    </nav>
  );
}
