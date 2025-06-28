import React from 'react';
import styles from './QuestionsEnd.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import boltLogo from '../../assets/QuestionsMenu/bolt.png';

const QuestionsEnd: React.FC = () => {
    return (
        <div>
            <Header />
            <section className={styles.questionsEndSection}>
                <h2 className={styles.sectionTitle}>Parabéns!</h2>
                <h3 className={styles.sectionSubtitle}>Você completou o quiz.</h3>

                <div className={styles.xpContainer}>
                    <img src={boltLogo} alt="raio"></img>
                    <p className={styles.xpText}>+50 XP</p>
                </div>

                <p className={styles.xpDescription}>Você completou o quiz com 90% dos acertos.</p>
            </section>
            <Footer />
        </div>
    );
};

export default QuestionsEnd;