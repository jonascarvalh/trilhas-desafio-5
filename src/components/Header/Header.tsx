import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSectionClick = (sectionId: string) => {
        // Fecha o menu mobile se estiver aberto
        setMenuOpen(false);
        
        // Se já estamos na home page, apenas rola para a seção
        if (location.pathname === '/') {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Se não estamos na home page, navega para lá e depois rola
            navigate('/');
            // Aguarda um pouco para a navegação acontecer antes de rolar
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    };

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
                <button 
                    className={styles.navLink} 
                    onClick={() => handleSectionClick('motivation')}
                >
                    Motivação
                </button>
                <button 
                    className={styles.navLink} 
                    onClick={() => handleSectionClick('steps')}
                >
                    Passo a Passo
                </button>
                <button 
                    className={styles.navLink} 
                    onClick={() => handleSectionClick('content')}
                >
                    Conteúdos Recentes
                </button>
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