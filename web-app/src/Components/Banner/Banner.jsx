import Cards from "../cards/Cards";
import devices_img from "../../Assets/Images/devices.png";
import PrimaryButton from "../primaryBtn/PrimaryBtn";
import SecondaryBtn from "../secondaryBtn/SecondaryBtn";
import styles from "./Banner.module.scss";
import bid_icon from "../../Assets/Images/bid_icon.svg";
import clock_icon from "../../Assets/Images/clock_icon.svg";
import star_icon from "../../Assets/Images/star_icon.svg";

export default function Banner() {
  const infos = [
    { titulo: "Leilões Realizados", resultado: "2.000+", img: bid_icon, alternativo: "Ícone de Lance" },
    { titulo: "Disponível 24h por dia", resultado: "24/7", img: clock_icon, alternativo: "Ícone de Relógio" },
    { titulo: "Média de Avaliações", resultado: 8.5, img: star_icon, alternativo: "Ícone de Estrela" },
  ];
  return (
    <section className={styles.banner}>
      <div className={`${styles.banner__container} container`}>
        <div className={styles.texto__banner}>
          <h1>
            Sinta a emoção de acompanhar os <span className={styles.destaque}>melhores leilões</span> disponíveis <span className={styles.destaque}>ao vivo!</span>
          </h1>
          <div className={styles.botoes}>
            <PrimaryButton texto='Cadastrar' />
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
