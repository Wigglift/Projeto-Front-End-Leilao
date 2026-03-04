import styles from "./Card.module.scss";

export default function Card({ info }) {
  return (
    <div className={styles.card}>
      <div className={styles.card__container}>
        <div className={styles.card__icone}>
          <div className={styles.icone_bg}>
            <img src={info.img} alt={info.alternativo} title={info.alternativo} />
          </div>
          <div className={styles.texto__card}>
            <h4>{info.resultado}</h4>
            <span>{info.titulo}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
