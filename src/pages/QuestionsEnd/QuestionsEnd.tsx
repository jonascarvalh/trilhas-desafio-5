import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import styles from './QuestionsEnd.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import boltLogo from '../../assets/QuestionsMenu/bolt.png';
import { getUserBadges, type UserBadge } from '../../services/userService';

const QuestionsEnd: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [earnedBadge, setEarnedBadge] = useState<UserBadge | null>(null);
    const [loadingBadge, setLoadingBadge] = useState(false);
    
    const score = parseFloat(searchParams.get('score') || '0');
    const passed = searchParams.get('passed') === 'true';
    const xpEarned = parseInt(searchParams.get('xpEarned') || '0');
    const badgeEarned = searchParams.get('badgeEarned') === 'true';
    const articleId = searchParams.get('articleId');

    useEffect(() => {
        if (passed && xpEarned > 0) {
            toast.success(`Parabéns! Você ganhou ${xpEarned} XP!`, {
                duration: 4000,
            });
        }
        
        if (!passed) {
            toast.error('Você precisa de pelo menos 70% para passar. Tente novamente!', {
                duration: 4000,
            });
        }
    }, [passed, xpEarned, badgeEarned]);

    // Buscar a badge conquistada quando badgeEarned for true
    useEffect(() => {
        const fetchEarnedBadge = async () => {
            if (badgeEarned && articleId) {
                setLoadingBadge(true);
                try {
                    const userBadges = await getUserBadges();
                    const foundBadge = userBadges.find(badge => badge.id === parseInt(articleId));
                    if (foundBadge) {
                        setEarnedBadge(foundBadge);
                    }
                } catch (error) {
                    console.error('Erro ao buscar badge conquistada:', error);
                } finally {
                    setLoadingBadge(false);
                }
            }
        };

        fetchEarnedBadge();
    }, [badgeEarned, articleId]);

    const handleBackToHome = () => {
        if (passed) {
            navigate('/articles');
        } else {
            navigate('/'); // Vai para a home se perdeu
        }
    };

    const handleTryAgain = () => {
        navigate(-2); // Volta 2 páginas (para o QuestionsMenu)
    };

    const getResultMessage = () => {
        if (score >= 90) return 'Excelente!';
        if (score >= 80) return 'Muito Bem!';
        if (score >= 70) return 'Parabéns!';
        return 'Não foi desta vez...';
    };

    const getResultSubtitle = () => {
        if (passed) {
            return 'Você completou o quiz com sucesso.';
        } else {
            return 'Você não atingiu a pontuação mínima.';
        }
    };

    const getScoreDescription = () => {
        return `Você completou o quiz com ${score.toFixed(0)}% dos acertos.`;
    };

    return (
        <div>
            <Header />
            <section className={styles.questionsEndSection}>
                <h2 className={`${styles.sectionTitle} ${!passed ? styles.failTitle : ''}`}>
                    {getResultMessage()}
                </h2>
                <h3 className={styles.sectionSubtitle}>
                    {getResultSubtitle()}
                </h3>

                {passed && xpEarned > 0 && (
                    <div className={styles.xpContainer}>
                        <img src={boltLogo} alt="raio" />
                        <p className={styles.xpText}>+{xpEarned} XP</p>
                    </div>
                )}

                {passed && badgeEarned && (
                    <div className={styles.badgeContainer}>
                        {loadingBadge ? (
                            <div className={styles.badgeIcon}>🏆</div>
                        ) : earnedBadge ? (
                            <img 
                                src={earnedBadge.image_url} 
                                alt={earnedBadge.badge_name}
                                className={styles.badgeImage}
                            />
                        ) : (
                            <div className={styles.badgeIcon}>🏆</div>
                        )}
                        <p className={styles.badgeText}>
                            {earnedBadge ? earnedBadge.badge_name : 'Nova Insígnia Conquistada!'}
                        </p>
                        {earnedBadge && (
                            <p className={styles.badgeDescription}>
                                {earnedBadge.description}
                            </p>
                        )}
                    </div>
                )}

                <p className={styles.xpDescription}>
                    {getScoreDescription()}
                </p>

                <div className={styles.buttons}>
                    {!passed && (
                        <button className={styles.tryAgainButton} onClick={handleTryAgain}>
                            Tentar Novamente
                        </button>
                    )}
                    <button className={styles.homeButton} onClick={handleBackToHome}>
                        {passed ? 'Ver Artigos' : 'Voltar ao Início'}
                    </button>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default QuestionsEnd;