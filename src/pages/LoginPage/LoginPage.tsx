import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
  return (
    <div>
      <Header />
      <div className={styles.loginPage}>
        <div className={styles.loginContainer}>
          <h1 className={styles.loginTitle}>Entrar</h1>
          <form className={styles.loginForm}>

            <div className={styles.loginInput}>
              <p className={styles.loginLabel}>E-mail:</p>
              <input type="email" placeholder='Digite seu e-mail' />
            </div>
            
            <div className={styles.loginInput}>
              <p className={styles.loginLabel}>Senha:</p>
              <input type="password" placeholder='Digite sua senha' />
            </div>

            <div className={styles.loginActions}>
              <button className={styles.loginButton}>Fazer Login</button>
              <p className={styles.helpText}>Não possui conta? 
                <Link to="/register" className={styles.helpTextLink}>
                  <strong> Registre-se aqui</strong>
                </Link>
              </p>
            </div>

          </form>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;