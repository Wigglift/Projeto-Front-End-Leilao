import styles from "./PrimaryBtn.module.scss";

export default function PrimaryButton({ texto }) {
  return (
      <a href='' className={styles.button}>
        {texto}
      </a>
  );
}
