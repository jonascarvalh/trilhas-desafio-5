import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './QuestionsMenu.module.css';
import clockLogo from '../../assets/QuestionsMenu/clock.png';
import checkLogo from '../../assets/QuestionsMenu/check.png';
import boltLogo from '../../assets/QuestionsMenu/bolt.png';

const QuestionsMenu: React.FC = () => {
    return (
        <div>
            <Header />
            <section className={styles.questionsMenuSection}>
                <h2 className={styles.sectionTitle}>Questionário</h2>
                <h3 className={styles.sectionSubtitle}>Preencha nosso quiz e ganhe experiência.</h3>

                <div className={styles.buttons}>
                    <a className={styles.startButton} href="#">Iniciar</a>
                    <a className={styles.backButton} href="#">Voltar</a>
                </div>

                <div className={styles.infoCards}>
                    <div className={styles.infoCard}>
                        <img src={clockLogo} alt="relógio"></img>
                        <p className={styles.infoCardText}>Tempo Estimado: 6 minutos de duração</p>
                    </div>
                    <div className={styles.infoCard}>
                        <img src={checkLogo} alt="check"></img>
                        <p className={styles.infoCardText}>4 questões</p>
                    </div>
                    <div className={styles.infoCard}>
                        <img src={boltLogo} alt="raio"></img>
                        <p className={styles.infoCardText}>+40 XP ao concluir o questionário</p>
                    </div>
                </div>

                <div className={styles.infoText}>
                    <p>Apenas uma alternativa correta;</p>
                    <p>Acerte no mínimo 70% do questionário para concluir;</p>
                    <p>Conclua dentro do tempo estimado.</p>
                </div>

            </section>
            <Footer />
        </div>
    );
};

export default QuestionsMenu;