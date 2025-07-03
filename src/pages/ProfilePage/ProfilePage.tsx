import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './ProfilePage.module.css';
import profileImage from 'assets/ProfilePage/default-profile.svg';
import { getUserData, getUserProgress, getUserBadges } from '../../services/userService';
import type { UserData, UserProgress, UserBadge } from '../../services/userService';

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
    const [userBadges, setUserBadges] = useState<UserBadge[]>([]);
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
                // Buscar dados do usuário, progresso e badges em paralelo
                const [data, progress, badges] = await Promise.all([
                    getUserData(),
                    getUserProgress(),
                    getUserBadges()
                ]);
                
                setUserData(data);
                setUserProgress(progress);
                setUserBadges(badges);
                
                toast.success('Perfil carregado com sucesso!', {
                    duration: 3000,
                    id: toastId,
                });
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
                setError('Erro ao carregar dados do perfil');
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

    const handleNavigateToArticles = () => {
        navigate('/articles');
    };

    if (loading) {
        return (
            <div>
                <Header />
                <section className={styles.profileSection}>
                    <div className={styles.profilePage}>
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
                        <img src={profileImage} alt="Profile" width="350" height="350" />
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
                            <span className={styles.profileData}>{userProgress?.xp || 0}</span><span className={styles.profileData}>XP</span>
                        </div>
                        <div className={styles.profileInfo}>
                            <p>Nível:</p>
                            <span className={styles.profileData}>{userProgress?.level || 1}</span>
                        </div>
                        <div>
                            <p>Insígnias:</p>
                            <div className={styles.profileInsignias}>
                                {userBadges.length > 0 ? (
                                    userBadges.map((badge) => (
                                        <div key={badge.id} className={styles.badgeItem} title={`${badge.badge_name} - ${badge.description}`}>
                                            <img 
                                                src={badge.image_url} 
                                                alt={badge.badge_name}
                                                className={styles.badgeImage}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <p className={styles.noBadges}>Nenhuma insígnia conquistada ainda</p>
                                )}
                            </div>
                        </div>
                        <div className={styles.buttonsContainer}>
                            <button className={styles.articlesButton} onClick={handleNavigateToArticles}>
                                Artigos
                            </button>
                            <button className={styles.logoutButton} onClick={handleLogout}>
                                Sair
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default ProfilePage;