import { useState } from "react";
import api from "../../services/api";
import AuctionAside from "../../components/auctionAside/AuctionAside";
import AuctionCard from "../../components/auctionCard/AuctionCard";
import AuctionMain from "../../components/auctionMain/auctionMain";
import LoggedInTemplate from "../../templates/loggedInTemplate/LoggedInTemplate";
import styles from "./LiveAuction.module.scss";

export default function Profile() {
  const [selectedCidade, setSelectedCidade] = useState("TODOS");
  const [selectedEstado, setSelectedEstado] = useState("TODOS");
  const [selectedTipo, setSelectedTipo] = useState("TODOS");
  const estadosLocalidade = {selectedCidade:selectedCidade, setSelectedCidade:setSelectedCidade, selectedEstado:selectedEstado, setSelectedEstado:setSelectedEstado} 
  return (
    <LoggedInTemplate>
      <section className={styles.liveAuction}>
        <div className={`${styles.liveAuctionContainer} container`}>
          <h2 className={styles.auctionTitle}>Leilão Live</h2>
          <div className={styles.actionWrap}>
            <AuctionAside 
              setSelectedTipo={setSelectedTipo} 
              selectedTipo={selectedTipo} 
              selectedCidade={selectedCidade}
              setSelectedCidade={setSelectedCidade}
              selectedEstado={selectedEstado}
              setSelectedEstado={setSelectedEstado}/>
            <AuctionMain 
              selectedTipo={selectedTipo} 
              selectedCidade={selectedCidade}
              selectedEstado={selectedEstado}/>
          </div> 
        </div>
      </section>
    </LoggedInTemplate>
  );
}
