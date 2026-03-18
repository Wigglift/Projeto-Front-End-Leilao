import styles from "./Card.module.scss";

export default function Card({ info }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardContainer}>
        <div className={styles.cardIcone}>
          <div className={styles.iconeBg}>
            <img src={info.img} alt={info.alternativo} title={info.alternativo} />
          </div>
          <div className={styles.textoCard}>
            <h4>{info.resultado}</h4>
            <span>{info.titulo}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
