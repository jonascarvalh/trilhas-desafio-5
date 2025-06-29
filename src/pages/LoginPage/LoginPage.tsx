import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';  // Certifique-se de importar a função de login
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();  // Hook para navegação após login

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !senha.trim()) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }

    try {
      // Envia as credenciais para o servidor
      await login(email, senha);
      // Se o login for bem-sucedido, redireciona para a página de perfil
      navigate('/profile');
    } catch (error) {
      setErro('Credenciais inválidas');
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.loginPage}>
        <div className={styles.loginContainer}>
          <h1 className={styles.loginTitle}>Entrar</h1>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <div className={styles.loginInput}>
              <p className={styles.loginLabel}>E-mail:</p>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.loginInput}>
              <p className={styles.loginLabel}>Senha:</p>
              <input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            {erro && <p className={styles.loginError}>{erro}</p>}

            <div className={styles.loginActions}>
              <button className={styles.loginButton} type="submit">
                Fazer Login
              </button>
              <p className={styles.helpText}>
                Não possui conta?{' '}
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
