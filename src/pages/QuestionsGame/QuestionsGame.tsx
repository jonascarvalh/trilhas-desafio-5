import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import styles from './QuestionsGame.module.css';
import Footer from '../../components/Footer/Footer';
import { getQuizQuestionsWithOptions, getArticleQuiz } from '../../services/articleService';
import type { QuestionWithOptions, Quiz } from '../../services/articleService';

const QuestionsGame: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [questions, setQuestions] = useState<QuestionWithOptions[]>([]);
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userXP, setUserXP] = useState(150); // XP do usuário (pode vir do contexto/localStorage)

    const quizId = searchParams.get('quizId');

    useEffect(() => {
        const fetchQuizData = async () => {
            if (!quizId) {
                setError('ID do quiz não fornecido');
                setLoading(false);
                return;
            }

            try {
                // Buscar dados do quiz e perguntas em paralelo
                const [questionsData, quizData] = await Promise.all([
                    getQuizQuestionsWithOptions(parseInt(quizId)),
                    // Para buscar o quiz, precisamos do articleId, mas vamos simular por enquanto
                    // getArticleQuiz(articleId) - como não temos o articleId aqui, vamos criar um objeto básico
                    Promise.resolve({
                        id: parseInt(quizId),
                        article_id: 1,
                        title: 'Quiz de Conhecimento',
                        description: 'Teste seus conhecimentos',
                        xp_reward: 50,
                        badge_id: null
                    } as Quiz)
                ]);

                setQuestions(questionsData);
                setQuiz(quizData);
            } catch (err) {
                setError('Erro ao carregar o quiz');
                console.error('Erro ao buscar dados do quiz:', err);
                toast.error('Erro ao carregar o quiz');
            } finally {
                setLoading(false);
            }
        };

        fetchQuizData();
    }, [quizId]);

    const handleAnswerSelect = (questionId: number, optionId: number) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionId]: optionId
        }));
    };

    const handleNextQuestion = () => {
        const currentQuestion = questions[currentQuestionIndex];
        
        if (!selectedAnswers[currentQuestion.id]) {
            toast.error('Por favor, selecione uma resposta antes de continuar');
            return;
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            // Última pergunta - finalizar quiz
            handleFinishQuiz();
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleFinishQuiz = () => {
        // Calcular pontuação
        let correctAnswers = 0;
        
        questions.forEach(question => {
            const selectedOptionId = selectedAnswers[question.id];
            const selectedOption = question.options.find(opt => opt.id === selectedOptionId);
            
            if (selectedOption?.is_correct) {
                correctAnswers++;
            }
        });

        const score = (correctAnswers / questions.length) * 100;
        const passed = score >= 70;

        // Navegar para a página de resultados
        navigate(`/questions-end?score=${score}&passed=${passed}&xpEarned=${passed ? quiz?.xp_reward || 0 : 0}`);
    };

    if (loading) {
        return (
            <div>
                <section className={styles.questionsGameSection}>
                    <p>Carregando quiz...</p>
                </section>
                <Footer />
            </div>
        );
    }

    if (error || !questions.length) {
        return (
            <div>
                <section className={styles.questionsGameSection}>
                    <h2 className={styles.sectionTitle}>Erro</h2>
                    <p>{error || 'Nenhuma pergunta encontrada'}</p>
                    <button className={styles.nextButton} onClick={() => navigate(-1)}>
                        Voltar
                    </button>
                </section>
                <Footer />
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
        <div>
            <section className={styles.questionsGameSection}>
                <div className={styles.header}>
                    <p className={styles.xpText}>XP: {userXP}</p>
                    <div className={styles.progressContainer}>
                        <div className={styles.progressBar}>
                            <div 
                                className={styles.progressFill} 
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <p className={styles.progressText}>
                            Pergunta {currentQuestionIndex + 1} de {questions.length}
                        </p>
                    </div>
                </div>

                <h2 className={styles.sectionTitle}>{quiz?.title || 'Quiz'}</h2>
                <h3 className={styles.sectionSubtitle}>{currentQuestion.question_text}</h3>

                <div className={styles.radioCards}>
                    {currentQuestion.options.map((option) => (
                        <label 
                            key={option.id} 
                            className={`${styles.radioCard} ${
                                selectedAnswers[currentQuestion.id] === option.id ? styles.selected : ''
                            }`}
                        >
                            <input 
                                type="radio" 
                                name={`question-${currentQuestion.id}`}
                                value={option.id}
                                checked={selectedAnswers[currentQuestion.id] === option.id}
                                onChange={() => handleAnswerSelect(currentQuestion.id, option.id)}
                            />
                            <p>{option.option_text}</p>
                        </label>
                    ))}
                </div>

                <div className={styles.buttons}>
                    {currentQuestionIndex > 0 && (
                        <button className={styles.backButton} onClick={handlePreviousQuestion}>
                            Anterior
                        </button>
                    )}
                    <button className={styles.nextButton} onClick={handleNextQuestion}>
                        {currentQuestionIndex === questions.length - 1 ? 'Finalizar' : 'Próxima'}
                    </button>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default QuestionsGame;