import styles from "./LoginCard.module.scss"
import { Link } from "react-router-dom";
import { use, useState } from "react";
import { useAuth } from "../../contexts/auth/useAuth";

export default function LoginBidLive() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    useAuth().login({ email, senha });
    alert(`Login com: ${email}`);
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Bem vindo de volta</h1>
        <p className={styles.subtitle}>
          Faça seu login para poder ter acesso ao{" "}
          <strong className={styles.brand}>BidLive.</strong>
        </p>

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>E-MAIL</label>
            <input
              type="email"
              placeholder="Insira seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              onFocus={(e) => (e.target.style.borderColor = "#4a9eff")}
              onBlur={(e) => (e.target.style.borderColor = "transparent")}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>SENHA</label>
            <div className={styles.inputWrapper}>
              <input
                type={mostrarSenha ? "text" : "password"}
                placeholder="••••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className={`${styles.input} ${styles.inputPadding}`}
                onFocus={(e) => (e.target.style.borderColor = "#4a9eff")}
                onBlur={(e) => (e.target.style.borderColor = "transparent")}
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className={styles.eyeBtn}
              >
                {mostrarSenha ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4a9eff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4a9eff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button type="submit" className={styles.loginBtn}
            onMouseEnter={(e) => (e.target.style.background = "#235c99")}
            onMouseLeave={(e) => (e.target.style.background = "#4a9eff")}
          >
            Login
          </button>
        </form>

        <p className={styles.cadastroText}>
          Não possui conta?{" "}
          <Link to='/register'>
            <a href="#" className={styles.cadastroLink}>Cadastrar</a>
          </Link>
        </p>
      </div>
    </div>
  );
}

