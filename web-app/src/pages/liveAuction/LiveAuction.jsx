import { useState } from "react";
import api from "../../services/api";
import AuctionAside from "../../components/auctionAside/AuctionAside";
import AuctionCard from "../../components/auctionCard/AuctionCard";
import AuctionMain from "../../components/auctionMain/auctionMain";
import LoggedInTemplate from "../../templates/loggedInTemplate/LoggedInTemplate";
import styles from "./LiveAuction.module.scss";

export default function Profile() {
  const [selected, setSelected] = useState("TODOS");


  return (
    <LoggedInTemplate>
      <div className={styles.liveAuctionContainer}>
        <AuctionAside setSelected={setSelected} selected={selected} />
        <AuctionMain selected={selected} />
      </div>
    </LoggedInTemplate>
  );
}
