import Card from "./card/Card";
import styles from "./Cards.module.scss";

export default function Cards({ infos }) {
  return (
    <div className={styles.cards}>
      {infos.map((info, index) => {
        return <Card info={info} key={index} />;
      })}
    </div>
  );
}
