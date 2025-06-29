import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './QuestionsMenu.module.css';
import clockLogo from '../../assets/QuestionsMenu/clock.png';
import checkLogo from '../../assets/QuestionsMenu/check.png';
import boltLogo from '../../assets/QuestionsMenu/bolt.png';
import { getArticleQuiz } from '../../services/articleService';
import type { Quiz } from '../../services/articleService';

const QuestionsMenu: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const articleId = searchParams.get('articleId');

    useEffect(() => {
        const fetchQuiz = async () => {
            if (!articleId) {
                setError('ID do artigo não fornecido');
                setLoading(false);
                return;
            }

            try {
                const quizData = await getArticleQuiz(parseInt(articleId));
                setQuiz(quizData);
            } catch (err) {
                setError('Erro ao carregar o quiz');
                console.error('Erro ao buscar quiz:', err);
                toast.error('Erro ao carregar o quiz');
            } finally {
                setLoading(false);
            }
        };

        fetchQuiz();
    }, [articleId]);

    const handleStartQuiz = () => {
        if (!quiz) {
            toast.error('Quiz não carregado');
            return;
        }
        
        // Navegar para a página do jogo de questões passando o ID do quiz
        navigate(`/questions-game?quizId=${quiz.id}`);
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <div>
                <Header />
                <section className={styles.questionsMenuSection}>
                    <p>Carregando quiz...</p>
                </section>
                <Footer />
            </div>
        );
    }

    if (error || !quiz) {
        return (
            <div>
                <Header />
                <section className={styles.questionsMenuSection}>
                    <h2 className={styles.sectionTitle}>Erro</h2>
                    <p>{error || 'Quiz não encontrado'}</p>
                    <button className={styles.backButton} onClick={handleBackClick}>
                        Voltar
                    </button>
                </section>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Header />
            <section className={styles.questionsMenuSection}>
                <h2 className={styles.sectionTitle}>{quiz.title}</h2>
                <h3 className={styles.sectionSubtitle}>{quiz.description}</h3>

                <div className={styles.buttons}>
                    <button className={styles.startButton} onClick={handleStartQuiz}>
                        Iniciar
                    </button>
                    <button className={styles.backButton} onClick={handleBackClick}>
                        Voltar
                    </button>
                </div>

                <div className={styles.infoCards}>
                    <div className={styles.infoCard}>
                        <img src={clockLogo} alt="relógio"></img>
                        <p className={styles.infoCardText}>Tempo Estimado: 6 minutos de duração</p>
                    </div>
                    <div className={styles.infoCard}>
                        <img src={checkLogo} alt="check"></img>
                        <p className={styles.infoCardText}>4 questões</p>
                    </div>
                    <div className={styles.infoCard}>
                        <img src={boltLogo} alt="raio"></img>
                        <p className={styles.infoCardText}>+{quiz.xp_reward} XP ao concluir o questionário</p>
                    </div>
                </div>

                <div className={styles.infoText}>
                    <p>Apenas uma alternativa correta;</p>
                    <p>Acerte no mínimo 70% do questionário para concluir;</p>
                    <p>Conclua dentro do tempo estimado.</p>
                </div>

            </section>
            <Footer />
        </div>
    );
};

export default QuestionsMenu;