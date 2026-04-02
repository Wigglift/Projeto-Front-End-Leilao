import { useState, useEffect } from "react";
import styles from "./AuctionAside.module.scss";
import { login, leiloesService } from "../../services/api";
import loteIcon from "../../assets/images/lote_icon.svg";
import mapaIcon from "../../assets/images/mapa_icon.svg";
import FilterOption from "../filterOption/FilterOption";

export default function AuctionAside({
  setSelectedTipo, selectedTipo,
  selectedCidade, setSelectedCidade,
  selectedEstado, setSelectedEstado }) {
  const [types, setTypes] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        setLoading(true);
        const tokenAtual = localStorage.getItem("@Leiloes:token");
        if (!tokenAtual) {
          await login();
        }

        const responseType = await leiloesService.obterTipos();
        const responseCity = await leiloesService.obterCidadesEstados();
        setTypes(responseType.data);
        setCidades(responseCity.data);
      } catch (err) {
        setErro("Falha ao carregar os leilões. Verifique o console.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, []);

  types[0] = { tipo: "TODOS" };
  cidades[0] = { cidade: "TODOS" };

  return (
    <aside className={styles.actionAside}>
      <div className={styles.fsWrap}>
        <h3>Filtrar por</h3>
        <FilterOption tipoFiltro='tipo' title='Tipos' types={types} img={loteIcon} setSelected={setSelectedTipo} selected={selectedTipo} />
        <FilterOption tipoFiltro='cidade' title='Cidades' types={cidades} img={mapaIcon} setSelected={setSelectedCidade} selected={selectedCidade} />
      </div>
    </aside>
  );
}
