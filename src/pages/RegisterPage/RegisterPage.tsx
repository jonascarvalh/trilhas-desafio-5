import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { register } from '../../services/authService';  // Certifique-se de importar a função de registro
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './RegisterPage.module.css';

const RegisterPage: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const navigate = useNavigate();  // Hook para navegação após registro

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nome.trim() || !email.trim() || !senha.trim() || !confirmarSenha.trim()) {
      toast.error('Por favor, preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      toast.error('As senhas não coincidem.');
      return;
    }

    try {
      // Mostrar toast de carregamento
      toast.loading('Registrando usuário...', {
        duration: 2000,
      });
      
      // Envia os dados de registro para o servidor
      await register(email, senha, nome);
      
      // Toast de sucesso
      toast.success('Usuário registrado com sucesso!');
      
      // Se o registro for bem-sucedido, redireciona para a página de login
      navigate('/login');
    } catch (error) {
      toast.error('Erro ao registrar usuário');
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.registerPage}>
        <div className={styles.registerContainer}>
          <h1 className={styles.registerTitle}>Registro</h1>
          <form className={styles.registerForm} onSubmit={handleSubmit}>
            <div className={styles.registerInput}>
              <p className={styles.registerLabel}>Nome:</p>
              <input
                type="text"
                placeholder="Digite seu nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className={styles.registerInput}>
              <p className={styles.registerLabel}>E-mail:</p>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.registerInput}>
              <p className={styles.registerLabel}>Senha:</p>
              <input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <div className={styles.registerInput}>
              <p className={styles.registerLabel}>Confirme sua Senha:</p>
              <input
                type="password"
                placeholder="Confirme sua senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
              />
            </div>

            <div className={styles.registerActions}>
              <button className={styles.registerButton} type="submit">
                Realizar Registro
              </button>
              <p className={styles.helpText}>
                Já possui conta?{' '}
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
