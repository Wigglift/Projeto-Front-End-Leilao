import styles from "./PrimaryBtn.module.scss";
import { Link } from "react-router-dom";

export default function PrimaryButton({ texto, destino }) {
  return (
    <Link to={destino} className={styles.button}>
      {texto}
    </Link>
  );
}
