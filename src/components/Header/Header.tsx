import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import { isAuthenticated } from '../../services/authService';

const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const isLoggedIn = isAuthenticated();

    const handleSectionClick = (sectionId: string) => {
        setMenuOpen(false);
        
        if (location.pathname === '/') {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            navigate('/');
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
                {isLoggedIn ? (
                    <Link to="/profile" className={`${styles.button} ${styles.navButton}`}>
                        Perfil
                    </Link>
                ) : (
                    <Link to="/login" className={`${styles.button} ${styles.navButton}`}>
                        Entrar
                    </Link>
                )}
            </nav>
            {isLoggedIn ? (
                <Link to="/profile" className={`${styles.button} ${styles.desktopButton}`}>
                    Perfil
                </Link>
            ) : (
                <Link to="/login" className={`${styles.button} ${styles.desktopButton}`}>
                    Entrar
                </Link>
            )}
        </header>
    );
};

export default Header;