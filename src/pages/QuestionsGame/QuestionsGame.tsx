import React from 'react';
import styles from './QuestionsGame.module.css';
import Footer from '../../components/Footer/Footer';

const QuestionsGame: React.FC = () => {
    return (
        <div>
            <section className={styles.questionsGameSection}>
                <p className={styles.xpText}>XP: 150</p>
                <h2 className={styles.sectionTitle}>Conceitos Fundamentais</h2>
                <h3 className={styles.sectionSubtitle}>O que é a Inteligência Artificial (IA)?</h3>

                <div className={styles.radioCards}>
                    <label className={styles.radioCard}>
                        <input type="radio" name="radio-trilha" id="back" value="back"></input>
                        <p>Um robô físico de fábrica.</p>
                    </label>

                    <label className={styles.radioCard}>
                        <input type="radio" name="radio-trilha" id="back" value="back"></input>
                        <p>Um tipo de programa que aprende com dados.</p>
                    </label>

                    <label className={styles.radioCard}>
                        <input type="radio" name="radio-trilha" id="back" value="back"></input>
                        <p>Uma linguagem de programação.</p>
                    </label>

                    <label className={styles.radioCard}>
                        <input type="radio" name="radio-trilha" id="back" value="back"></input>
                        <p>Uma rede social.</p>
                    </label>
                </div>

                <div className={styles.buttons}>
                    <a className={styles.nextButton} href="#">Próxima</a>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default QuestionsGame;