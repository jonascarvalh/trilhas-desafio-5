import React, { useState } from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <a href="#">Conecta AI</a>
            </div>
            <div className={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </div>
            <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
                <a href="/">Início</a>
                <a href="/motivation">Motivação</a>
                <a href="/steps">Passo a Passo</a>
                <a href="/content">Conteúdos Recentes</a>
                <button className={`${styles.button} ${styles.navButton}`}>
                    Entrar
                </button>
            </nav>
            <button className={`${styles.button} ${styles.desktopButton}`}>
                Entrar
            </button>
        </header>
    );
};

export default Header;