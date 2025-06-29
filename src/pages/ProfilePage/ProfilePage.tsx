import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './ProfilePage.module.css';
import profileImage from 'assets/ProfilePage/profile.png';
import nitroImage from 'assets/ProfilePage/nitro.png';
import hypesquadImage from 'assets/ProfilePage/hypesquad.png';
import { getUserData } from '../../services/userService';
import type { UserData } from '../../services/userService';

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const hasShownToast = useRef(false);

    useEffect(() => {
        const fetchUserData = async () => {
            // Evitar toasts duplicados em StrictMode usando useRef
            if (hasShownToast.current) return;
            hasShownToast.current = true;
            
            const toastId = 'profile-loading';
            
            try {
                const data = await getUserData();
                setUserData(data);
                toast.success('Perfil carregado com sucesso!', {
                    duration: 3000,
                    id: toastId,
                });
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
                toast.error('Erro ao carregar perfil. Tente novamente.', {
                    duration: 3000,
                    id: toastId,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = () => {
        // Limpar dados do localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        
        // Redirecionar para a página inicial
        navigate('/');
        
        toast.success('Logout realizado com sucesso!');
    };

    if (loading) {
        return (
            <div>
                <Header />
                <section className={styles.profileSection}>
                    <div className={styles.profilePage}>
                        <p>Carregando...</p>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Header />
                <section className={styles.profileSection}>
                    <div className={styles.profilePage}>
                        <p>Erro: {error}</p>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Header />
            <section className={styles.profileSection}>
                <div className={styles.profilePage}>
                    <div>
                        <img src={profileImage} alt="Profile" />
                    </div>
                    <div className={styles.profileInfoContainer}>
                        <div className={styles.profileInfo}>
                            <p>Nome:</p>
                            <span className={styles.profileData}>{userData?.username || 'N/A'}</span>
                        </div>
                        <div className={styles.profileInfo}>
                            <p>E-mail:</p>
                            <span className={styles.profileData}>{userData?.email || 'N/A'}</span>
                        </div>
                        <div className={styles.profileInfo}>
                            <p>XP Obtido:</p>
                            <span className={styles.profileData}>{userData?.xp || 0}</span><span className={styles.profileData}>XP</span>
                        </div>
                        <div>
                            <p>Insignias:</p>
                            <div className={styles.profileInsignias}>
                                {userData?.badges?.includes('nitro') && <img src={nitroImage} alt="Insignia Nitro" />}
                                {userData?.badges?.includes('hypesquad') && <img src={hypesquadImage} alt="Insignia Hypesquad" />}
                            </div>
                        </div>
                        <button className={styles.logoutButton} onClick={handleLogout}>
                            Sair
                        </button>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default ProfilePage;