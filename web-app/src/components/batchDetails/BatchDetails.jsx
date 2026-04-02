import { useState } from "react";
import styles from "./BatchDetails.module.scss";

const icons = {
  gauge: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/>
    </svg>
  ),
  fuel: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 22V7l9-5 9 5v15"/><path d="M3 11h18"/><path d="M12 22V11"/>
    </svg>
  ),
  calendar: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
    </svg>
  ),
  tag: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
    </svg>
  ),
  id: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2"/><path d="M8 10h8M8 14h5"/>
    </svg>
  ),
  leilao: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="M13 13l6 6"/>
    </svg>
  ),
  check: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  x: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  dash: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
};

const StatusBadge = ({ value, label }) => {
  if (value === null || value === undefined) {
    return (
      <div className={styles.badge + " " + styles.badgeNull}>
        <span className={styles.badgeIcon}>{icons.dash}</span>
        <span>{label}</span>
      </div>
    );
  }
  const isTrue = value === 1 || value === true || value === "1";
  return (
    <div className={styles.badge + (isTrue ? " " + styles.badgeYes : " " + styles.badgeNo)}>
      <span className={styles.badgeIcon}>{isTrue ? icons.check : icons.x}</span>
      <span>{label}</span>
    </div>
  );
};

const InfoChip = ({ icon, label, value }) => (
  <div className={styles.infoChip}>
    <span className={styles.chipIcon}>{icon}</span>
    <div className={styles.chipContent}>
      <span className={styles.chipLabel}>{label}</span>
      <span className={styles.chipValue}>{value}</span>
    </div>
  </div>
);

export default function BatchDetails({ vehicle}){
  const [tab, setTab] = useState("geral");

  const tabs = ["geral", "opcionais", "documentos"];

  return (
    <>
      <div className={styles.vcPage}>
        <div className={styles.vcCard}>

          {/* LEFT */}
          <div className={styles.vcLeft}>
            <div className={styles.vcBadgeRow}>
              <span className={styles.vcTipo}>{vehicle.tipo.replace(/_/g, " ")}</span>
              <span className={styles.vcIdPill}>#ID {vehicle.id}</span>
            </div>

            <div className={styles.vcTitle}>{vehicle.marca} {vehicle.modelo}</div>
            <div className={styles.vcSubtitle}>
              {vehicle.ano_modelo}/{vehicle.ano_fabricacao} · {vehicle.combustivel}
            </div>

            <div className={styles.chipsGrid}>
              <InfoChip icon={icons.gauge}    label="Quilometragem" value={`${vehicle.km.toLocaleString("pt-BR")} km`} />
              <InfoChip icon={icons.fuel}     label="Combustível"   value={vehicle.combustivel} />
              <InfoChip icon={icons.calendar} label="Ano Modelo"    value={`${vehicle.ano_modelo}/${vehicle.ano_fabricacao}`} />
              <InfoChip icon={icons.tag}      label="Câmbio"        value={vehicle.automatico ? "Automático" : "Manual"} />
              <InfoChip icon={icons.leilao}   label="Leilão"        value={`#${vehicle.leilao_id}`} />
              <InfoChip icon={icons.id}       label="Item ID"       value={`#${vehicle.id}`} />
            </div>
          </div>

          {/* RIGHT */}
          <div className={styles.vcRight}>
            <div className={styles.vcTabs}>
              {tabs.map((t) => (
                <button
                  key={t}
                  className={styles.tabBtn + (tab === t ? " " + styles.active : "")}
                  onClick={() => setTab(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className={styles.tabBody}>
              {tab === "geral" && (
                <div className={styles.badgeGrid}>
                  <StatusBadge value={vehicle.ligando}        label="Ligando" />
                  <StatusBadge value={vehicle.ar}             label="Ar-condicionado" />
                  <StatusBadge value={vehicle.direcao}        label="Direção" />
                  <StatusBadge value={vehicle.estepe}         label="Estepe" />
                  <StatusBadge value={vehicle.vidro_eletrico} label="Vidro Elétrico" />
                  <StatusBadge value={vehicle.automatico}     label="Automático" />
                  <StatusBadge value={vehicle.alagamento}     label="Alagamento" />
                  <StatusBadge value={vehicle.kit_gas}        label="Kit Gás" />
                </div>
              )}

              {tab === "opcionais" && (
                <div className={styles.badgeGrid}>
                  <StatusBadge value={vehicle.blindagem}               label="Blindagem" />
                  <StatusBadge value={vehicle.chave}                   label="Chave" />
                  <StatusBadge value={vehicle.manual_proprietario}     label="Manual" />
                  <StatusBadge value={vehicle.parabrisa_original}      label="Parabrisa Original" />
                  <StatusBadge value={vehicle.vidro_traseiro_original} label="Vidro Traseiro" />
                  <StatusBadge value={vehicle.chassi_oxidacao}         label="Chassi Oxidação" />
                  <StatusBadge value={vehicle.cambio_obstruido}        label="Câmbio Obstruído" />
                  <StatusBadge value={vehicle.cambio_periciado}        label="Câmbio Periciado" />
                  <StatusBadge value={vehicle.documento_gnv}           label="Doc. GNV" />
                  <StatusBadge value={vehicle.consta_blindagem}        label="Consta Blindagem" />
                </div>
              )}

              {tab === "documentos" && (
                <div className={styles.badgeGrid}>
                  <StatusBadge value={vehicle.ipva_pago}                 label="IPVA Pago" />
                  <StatusBadge value={vehicle.consta_crlve}              label="Consta CRLVE" />
                  <StatusBadge value={vehicle.consta_sinistro_documento}  label="Sinistro Doc." />
                  <StatusBadge value={vehicle.doc_blindagem}             label="Doc. Blindagem" />
                  <StatusBadge value={vehicle.placa_diverge_documento}   label="Placa Diverge" />
                  <StatusBadge value={vehicle.outro_estado_documento}    label="Outro Estado" />
                  <StatusBadge value={vehicle.emissao_laudo_csv}         label="Laudo CSV" />
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
