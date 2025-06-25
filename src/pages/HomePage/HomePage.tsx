import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './HomePage.module.css';

import moneyLogo from 'assets/HomePage/money.png';
import bookLogo from 'assets/HomePage/book.png';
import computerLogo from 'assets/HomePage/computer.png';
import userLogo from 'assets/HomePage/user.png';

const HomePage: React.FC = () => {
    return (
    <div>
      <Header />

      <section className={styles.mainSection}>
        <span className={styles.preTitle} >Transforme sua carreira com</span>
        <h1 className={styles.mainTitle} >Inteligência Artificial</h1>
        <p className={styles.mainDescription} >Capacitações acessíveis para quem busca emprego, renda e novas oportunidades na era digital.</p>
        <a className={styles.mainButton} href="#">Entenda como Funciona</a>
      </section>

      <section className={styles.motivationSection}>
        <h2 className={styles.sectionTitle}>Motivação</h2>
        <h3 className={styles.sectionSubtitle}>Por que isso é tão importante?</h3>

        <div className={styles.motivationCards}>
          <div className={styles.motivationCard}>
            <img src={moneyLogo} alt="renda"/>
            <p className={styles.motivationCardTitle}>Geração de renda</p>
          </div>

          <div className={styles.motivationCard}>
            <img src={userLogo} alt="renda"/>
            <p className={styles.motivationCardTitle}>Empregabilidade</p>
          </div>

          <div className={styles.motivationCard}>
            <img src={computerLogo} alt="renda"/>
            <p className={styles.motivationCardTitle}>Empreendedorismo</p>
          </div>

          <div className={styles.motivationCard}>
            <img src={bookLogo} alt="renda"/>
            <p className={styles.motivationCardTitle}>Alfabetização Digital</p>
          </div>
        </div>
        
      </section>

      <section className={styles.stepByStepSection}>
        <h2 className={styles.sectionTitle}>Passo a Passo</h2>
        <h3 className={styles.sectionSubtitle}>Aprenda de forma prática e gamificada.</h3>

        <div className={styles.stepByStepCards}>
          <div className={styles.stepByStepCardGroup}>
            <div className={styles.stepByStepCard}><p>1. Leia Artigos</p></div>
            <div className={styles.stepByStepCard}><p>2. Responda ás perguntas.</p></div>
          </div>
          <div className={styles.stepByStepCardGroup}>
            <div className={styles.stepByStepCard}><p>3. Ganhe XP e insígnias.</p></div>
            <div className={styles.stepByStepCard}><p>4. Melhore seu currículo e suas chances no mercado.</p></div>
          </div>
        </div>
      </section>

      <section className={styles.recentContentSection}>
        <h2 className={styles.sectionTitle}>Conteúdo Recente</h2>
        <h3 className={styles.sectionSubtitle}>Últimos conteúdos lançados na plataforma.</h3>

        <div className={styles.recentContentCards}>
          <div className={styles.recentContentCard}>
            <p className={styles.recentContentCardTitle}>Entendendo a IA</p>
            <a className={styles.recentContentCardLink} href="#">Acessar</a>
          </div>
          <div className={styles.recentContentCard}>
            <p className={styles.recentContentCardTitle}>IA na Rotina</p>
            <a className={styles.recentContentCardLink} href="#">Acessar</a>
          </div>
          <div className={styles.recentContentCard}>
            <p className={styles.recentContentCardTitle}>Empreender com IA</p>
            <a className={styles.recentContentCardLink} href="#">Acessar</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;