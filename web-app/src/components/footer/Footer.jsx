import styles from "./Footer.module.scss";
import logo from "../../assets/images/bidlive_logo.svg";
import BottomMenu from "../menu/bottom/BottomMenu";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div className={styles.footerLeft}>
          <div className={styles.logo}>
            <a href=''>
              <img src={logo} alt='Logo BidLive' title='Logo BidLive' />
            </a>
          </div>
          <p>Etiam senectus integer pharetra tempor lacinia ut.</p>
          <p>Magna dolor sed ut amet, adipiscing nunc. Nec morbi dolor, adipiscing lacus, tortor magna gravida sem.</p>
        </div>
        <div className={styles.footerCenter}>
          <div className='footerContainer'>
            <h4 className={styles.sectionTitle}>Links</h4>
            <ul className={styles.linksList}>
              <BottomMenu links={["Home", "Serviços", "Vantagens", "Sobre"]} />
            </ul>
          </div>
        </div>

        <div className={styles.footerRight}>
          <h4 className={styles.sectionTitle}>Contato</h4>
          <p>Etiam senectus integer pharetra tempor lacinia ut.</p>
          <p>Magna dolor sed ut amet, adipiscing nunc. Nec morbi dolor, adipiscing lacus, tortor magna gravida sem.</p>
          <p>Lacus, praesent nibh mattis quam id ultrices. Scelerisque amet elementum pulvinar cum sit. Fusce et justo quam purus viverra vitae.</p>
        </div>
      </div>

      <div className={styles.copyright}>Copyright © 2026 BidLive. Todos os direitos reservados.</div>
    </footer>
  );
}
