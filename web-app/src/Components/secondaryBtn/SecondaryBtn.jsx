import styles from "./SecondaryBtn.module.scss";

export default function SecondaryBtn({ texto }) {
  return (
    <a href='' className={styles.button}>
      {texto}
    </a>
  );
}
