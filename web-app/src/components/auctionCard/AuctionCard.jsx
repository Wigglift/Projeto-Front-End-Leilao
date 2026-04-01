import styles from "./AuctionCard.module.scss";
import { useState } from "react";

export default function AuctionCard({id, title, description, onPress}){
  const [pressed, setPressed] = useState(false);
  const imageUrl = `https://picsum.photos/seed/auction-${id}/400/300.jpg`;

  return (
    <>
      <div>
        <div style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            className={styles.card}
            onClick={() => {
              setPressed(true);
              onPress?.();
              setTimeout(() => setPressed(false), 1800);
            }}
          >
            <div className={styles.card_image}>
              <img src={imageUrl} alt={title} />
            </div>
            <div className={styles.card_body}>
              <div className={styles.card_title}>{title}</div>
                <div className={styles.meta_row}>
                  <svg className={styles.meta_icon} viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2"/>
                    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                  </svg>
                  {description}
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};