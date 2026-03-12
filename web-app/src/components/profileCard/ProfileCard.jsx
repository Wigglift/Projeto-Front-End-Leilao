import React from "react";
import { useEffect } from "react";
import { useAuth } from "../../contexts/auth/useAuth";
import styles from "./ProfileCard.module.scss";

const UserIcon = () => (
  <svg width="52" height="52" viewBox="0 0 24 24" fill="#5ba8f5">
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);

export default function Perfil() {
    const { user } = useAuth();

    let username = "Usuário";
    let email = "usuario@email.com";
    let senha = "****************";

    useEffect(() => {
    if (user) {
        username = user.name ;
        email = user.email;
        senha = user.password;
    }
    }, [user]);
  return (

    <div className={styles.perfil_container}>

      <h1 className={styles.perfil_title}>Perfil</h1>

      <div className={styles.user_row}>
        <div className={styles.avatar}>
          <UserIcon />
        </div>
        <span className={styles.username}>{username}</span>
      </div>

      <div className={styles.details_card}>
        <p className={styles.card_header}>Detalhes do usuário</p>
        <hr className={styles.divider} />

        <div className={styles.field}>
          <div className={styles.field_label}>Email</div>
          <div className={styles.field_value}>{email}</div>
        </div>

        <div className={styles.field}>
          <div className={styles.field_label}>Senha</div>
          <div className={styles.field_value}>{senha}</div>
        </div>
      </div>
    </div>
  );
}