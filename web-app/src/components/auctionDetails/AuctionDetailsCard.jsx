import styles from './AuctionDetailsCard.module.scss';
import { login, leiloesService } from "../../services/api";
import { use, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BatchDetails from '../batchDetails/BatchDetails';

export default function AuctionDetailsCard({id}){

    const [lotes, setLotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
    const location = useLocation();
    const leilao = location.state?.leilaoData;

    useEffect(() => {
        async function carregarDados() {
            try {
            setLoading(true);
            const tokenAtual = localStorage.getItem('@Leiloes:token');
            if (!tokenAtual) {
                await login();
            }
            
            const response = await leiloesService.obterLotes(id);
            setLotes(response.data);
    
            
            } catch (err) {
            setErro('Falha ao carregar os leilões. Verifique o console.');
            console.error(err);
            } finally {
            setLoading(false);
            }
        }
    
        carregarDados();
        }, []);

        console.log(lotes)

        return (
            <div className={styles.container}>
                <h2>Lotes</h2>
                {lotes && lotes.length > 0 && (
                    <div className={styles.lotesContainer}>
                    {lotes.map((item) => (
                        <BatchDetails key={item.id} vehicle={item} />
                    ))}
                </div>
            )}
            {!lotes || lotes.length === 0 ? <p className={styles.noLotes}>Nenhum lote encontrado para este leilão.</p> : null}
            </div>
        );
}