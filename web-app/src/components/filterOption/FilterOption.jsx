import styles from "./FilterOption.module.scss";

export default function FilterOption({ tipoFiltro, title, types, img, setSelected, selected }) {
  const handleSelect = (option) => {
    setSelected(option);
  };
  return (
    <>
      <div className={styles.fsHeader}>
        <div className={styles.fsIcon}>
          <img src={img} />
        </div>
        <h3 className={styles.fsTitle}>{title}</h3>
      </div>
      <div className={styles.optionFilter}>
        {tipoFiltro == "tipo" &&
          types.map(
            (opt) =>
              opt && (
                <a key={opt.tipo} className={styles.fsBtn + (selected === opt.tipo ? " " + styles.active : "")} onClick={() => handleSelect(opt.tipo)}>
                  {opt.tipo}
                </a>
              ),
          )}

        {tipoFiltro == "cidade" &&
          types.map(
            (opt) =>
              opt && (
                <a key={opt.cidade} className={styles.fsBtn + (selected === opt.cidade ? " " + styles.active : "")} onClick={() => handleSelect(opt.cidade)}>
                  {opt.cidade}
                </a>
              ),
          )}
      </div>
    </>
  );
}
