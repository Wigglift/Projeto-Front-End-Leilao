import { useState, useEffect } from "react";
import styles from "./AuctionAside.module.scss";
import { login, leiloesService } from "../../services/api";

export default function AuctionAside({
  setSelected,
  selected,
}){
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
    async function carregarDados() {
        try {
        setLoading(true);
        const tokenAtual = localStorage.getItem('@Leiloes:token');
        if (!tokenAtual) {
            await login();
        }
        
        const response = await leiloesService.obterTipos();
        setTypes(response.data);

        
        } catch (err) {
        setErro('Falha ao carregar os leilões. Verifique o console.');
        console.error(err);
        } finally {
        setLoading(false);
        }
    }

    carregarDados();
    }, []);
    
    types[0] = { tipo: "TODOS" }; 

  const handleSelect = (option) => {
    setSelected(option);
  };

  return (
    <aside>
    <h2>Filtros</h2>
      <div className={styles.fs_wrap}>
        <div className={styles.fs_header}>
          <div className={styles.fs_icon}>
            <span /><span /><span /><span />
          </div>
          <span className={styles.fs_title}>Tipo</span>
        </div>
        {types.map((opt) => (
            opt && (
                <button
                key={opt.tipo}
                className={styles.fs_btn + (selected === opt.tipo ? " " + styles.active : "")}
                onClick={() => handleSelect(opt.tipo)}
                >
                {opt.tipo}
                </button>
            )
            ))}
      </div>
    </aside>
  );
};

