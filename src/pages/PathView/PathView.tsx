import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import styles from './PathView.module.css';

const PathView: React.FC = () => {
    return (
        <div>
            <Header />
            <section className={styles.pathViewSection}>
                <h2 className={styles.sectionTitle}>Trilha de Aprendizado</h2>
                <h3 className={styles.sectionSubtitle}>Dê seu primeiro passo no aprendizado.</h3>

                <div className={styles.pathViewCards}>
                    <a className={styles.pathViewCard} href="#">
                        <span className={styles.articleTitle}>Artigo 1</span>
                    </a>
                    <a className={styles.pathViewCard} href="#">
                        <span className={styles.articleTitle}>Artigo 2</span>
                    </a>
                    <a className={styles.pathViewCard} href="#">
                        <span className={styles.articleTitle}>Artigo 3</span>
                    </a>
                </div>
                <a className={styles.pathViewButton} href="#">
                    <span className={styles.pathViewButtonText}>Iniciar Perguntas e Respostas</span>
                </a>
            </section>
            <Footer />
        </div>
    )
}

export default PathView;