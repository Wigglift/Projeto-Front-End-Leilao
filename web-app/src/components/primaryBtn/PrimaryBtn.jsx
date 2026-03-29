import styles from "./PrimaryBtn.module.scss";
import { Link } from "react-router-dom";

export default function PrimaryButton({ texto, destino, onClick }) {
  return (
    <Link to={destino} className={styles.button} onClick={onClick}>
      {texto}
    </Link>
  );
}
