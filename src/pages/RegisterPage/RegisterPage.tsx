import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './RegisterPage.module.css';

const RegisterPage: React.FC = () => {
  return (
    <div>
      <Header />
      <div className={styles.registerPage}>
        <div className={styles.registerContainer}>
          <h1 className={styles.registerTitle}>Registro</h1>
          <form className={styles.registerForm}>

            <div className={styles.registerInput}>
              <p className={styles.registerLabel}>Nome:</p>
              <input type="text" placeholder='Digite seu nome completo' />
            </div>

            <div className={styles.registerInput}>
              <p className={styles.registerLabel}>E-mail:</p>
              <input type="email" placeholder='Digite seu e-mail' />
            </div>
            
            <div className={styles.registerInput}>
              <p className={styles.registerLabel}>Senha:</p>
              <input type="password" placeholder='Digite sua senha' />
            </div>

            <div className={styles.registerInput}>
              <p className={styles.registerLabel}>Confirme sua Senha:</p>
              <input type="password" placeholder='Confirme sua senha' />
            </div>

            <div className={styles.registerActions}>
              <button className={styles.registerButton}>Realizar Registro</button>
              <p className={styles.helpText}>Já possui conta? 
                <Link to="/login" className={styles.helpTextLink}>
                  <strong> Entre aqui</strong>
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

export default RegisterPage; 