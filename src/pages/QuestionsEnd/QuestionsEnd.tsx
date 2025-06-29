import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import styles from './QuestionsEnd.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import boltLogo from '../../assets/QuestionsMenu/bolt.png';

const QuestionsEnd: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    const score = parseFloat(searchParams.get('score') || '0');
    const passed = searchParams.get('passed') === 'true';
    const xpEarned = parseInt(searchParams.get('xpEarned') || '0');

    useEffect(() => {
        if (passed && xpEarned > 0) {
            toast.success(`Parabéns! Você ganhou ${xpEarned} XP!`, {
                duration: 4000,
            });
        } else if (!passed) {
            toast.error('Você precisa de pelo menos 70% para passar. Tente novamente!', {
                duration: 4000,
            });
        }
    }, [passed, xpEarned]);

    const handleBackToHome = () => {
        navigate('/');
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
                        Voltar ao Início
                    </button>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default QuestionsEnd;