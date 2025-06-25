import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
    return (
        <section className={styles.footerSection}>
            <p className={styles.footerText}>Projeto fictício e sem fins comerciais. Imagens adquiridas na internet e/ou geradas por IA.</p>
            <p className={styles.footerText}>Desenvolvido para um projeto do Trilhas 2B.</p>
        </section>
    );
};

export default Footer; 