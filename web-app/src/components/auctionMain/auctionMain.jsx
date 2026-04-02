import React, { useEffect, useState } from "react";
import { login, leiloesService } from "../../services/api";
import AuctionCard from "../auctionCard/AuctionCard";
import styles from "./auctionMain.module.scss";
import { Navigate, useNavigate } from "react-router-dom";

export default function AuctionMain({
  selectedTipo,
  selectedCidade,
  selectedEstado,
}) {
  const [leiloes, setLeiloes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarDados() {
      try {
        setLoading(true);

        const tokenAtual = localStorage.getItem("@Leiloes:token");
        if (!tokenAtual) {
          await login();
        }

        const response = await leiloesService.listarTodos();
        setLeiloes(response.data);
      } catch (err) {
        setErro("Falha ao carregar os leilões. Verifique o console.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, []);

  const leiloesFiltrados = leiloes.filter((leilao) => {
    return (
      (selectedTipo === "TODOS" || leilao.tipo === selectedTipo) &&
      (selectedCidade === "TODOS" || leilao.cidade === selectedCidade) &&
      (selectedEstado === "TODOS" || leilao.estado === selectedEstado)
    );
  });

  if (loading) return <p>Carregando leilões...</p>;
  if (erro) return <p>{erro}</p>;

  return (
    <section className={styles.auctionMain}>
      <ul className={styles.auctionList}>
        {leiloesFiltrados
          .filter((leilao) => leilao.tipo)
          .map((leilao) => (
            <li key={leilao.id}>
              <AuctionCard
                id={leilao.id}
                title={leilao.tipo}
                description={leilao.cidade}
                onPress={() =>
                  navigate(`/auctionDetails?id=${leilao.id}`, {
                    state: { leilaoData: leilao },
                  })
                }
              />
            </li>
          ))}
      </ul>
    </section>
  );
}