import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link to="/">Conecta AI</Link>
            </div>
            <div className={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </div>
            <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
                <Link to="/">Início</Link>
                <a href="/motivation">Motivação</a>
                <a href="/steps">Passo a Passo</a>
                <a href="/content">Conteúdos Recentes</a>
                <Link to="/login" className={`${styles.button} ${styles.navButton}`}>
                    Entrar
                </Link>
            </nav>
            <Link to="/login" className={`${styles.button} ${styles.desktopButton}`}>
                Entrar
            </Link>
        </header>
    );
};

export default Header;