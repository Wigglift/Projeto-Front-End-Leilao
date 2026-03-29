import { useEffect } from "react";
import { useAuth } from "../../contexts/auth/useAuth";
import styles from "./ProfileCard.module.scss";
import PrimaryButton from "../primaryBtn/PrimaryBtn";

const UserIcon = () => (
  <svg width='52' height='52' viewBox='0 0 24 24' fill='#5ba8f5'>
    <circle cx='12' cy='8' r='4' />
    <path d='M4 20c0-4 3.6-7 8-7s8 3 8 7' />
  </svg>
);

export default function Perfil() {
  const { user, logout } = useAuth();

  let username = "Usuário";
  let email = "usuario@email.com";
  let senha = "****************";

  useEffect(() => {
    if (user) {
      username = user.name;
      email = user.email;
      senha = user.password;
    }
  }, [user]);

  return (
    <div className={styles.perfil}>
      <div className={`${styles.perfilContainer} container`}>
        <h2 className={styles.perfilTitle}>Perfil</h2>
        <div className={styles.userRow}>
          <div className={styles.avatar}>
            <UserIcon />
          </div>
          <span className={styles.username}>{username}</span>
        </div>

        <div className={styles.detailsCard}>
          <h4 className={styles.cardHeader}>Detalhes do usuário</h4>
          <hr className={styles.divider} />

          <div className={styles.field}>
            <h5 className={styles.fieldLabel}>Email</h5>
            <p className={styles.fieldValue}>{email}</p>
          </div>

          <div className={styles.field}>
            <h5 className={styles.fieldLabel}>Senha</h5>
            <p className={styles.fieldValue}>{senha}</p>
          </div>
        </div>
      </div>
      <PrimaryButton texto="Sair" onClick={logout}/>
    </div>
  );
}
