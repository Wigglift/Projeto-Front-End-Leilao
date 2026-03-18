import Cards from "../cards/Cards";
import devices_img from "../../assets/images/devices.png";
import PrimaryButton from "../primaryBtn/PrimaryBtn";
import SecondaryBtn from "../secondaryBtn/SecondaryBtn";
import styles from "./Banner.module.scss";
import bid_icon from "../../assets/images/bid_icon.svg";
import clock_icon from "../../assets/images/clock_icon.svg";
import star_icon from "../../assets/images/star_icon.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth/useAuth";

export default function Banner() {
  const infos = [
    { titulo: "Leilões Realizados", resultado: "2.000+", img: bid_icon, alternativo: "Ícone de Lance" },
    { titulo: "Disponível 24h por dia", resultado: "24/7", img: clock_icon, alternativo: "Ícone de Relógio" },
    { titulo: "Média de Avaliações", resultado: 8.5, img: star_icon, alternativo: "Ícone de Estrela" },
  ];

  const { user } = useAuth();
  return (
    <section className={styles.banner}>
      <div className={`${styles.banner__container} container`}>
        <div className={styles.texto__banner}>
          <h1>
            Sinta a emoção de acompanhar os <span className={styles.destaque}>melhores leilões</span> disponíveis <span className={styles.destaque}>ao vivo!</span>
          </h1>
          <div className={styles.botoes}>
            <PrimaryButton texto='Cadastrar' destino='/register' />
            <SecondaryBtn texto='Baixar App' />
          </div>
          <Cards infos={infos} />
        </div>
        <div className={styles.devices}>
          <img src={devices_img} alt='Protótipo do Bidlive na versão mobile' title='Protótipo do Bidlive na versão mobile' />
        </div>
      </div>
    </section>
  );
}
