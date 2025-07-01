import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import styles from './QuestionsGame.module.css';
import Footer from '../../components/Footer/Footer';
import { getQuizQuestionsWithOptions, getArticleQuiz, getQuizById } from '../../services/articleService';
import { updateUserXP, assignUserBadge } from '../../services/userService';
import type { QuestionWithOptions, Quiz } from '../../services/articleService';

// Importar arquivos de som
import acertoSound from '../../assets/QuestionsGame/acerto.mp3';
import erroSound from '../../assets/QuestionsGame/erro.mp3';
import conclusaoSound from '../../assets/QuestionsGame/conclusão.mp3';

const QuestionsGame: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [questions, setQuestions] = useState<QuestionWithOptions[]>([]);
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [correctAnswers, setCorrectAnswers] = useState(0); // Quantidade de acertos
    const [isFinishing, setIsFinishing] = useState(false); // Previne múltiplas execuções
    const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set()); // Perguntas já respondidas

    const quizId = searchParams.get('quizId');
    const articleId = searchParams.get('articleId');

    // Função para reproduzir sons
    const playSound = (soundFile: string) => {
        try {
            const audio = new Audio(soundFile);
            audio.volume = 0.5; // Volume a 50%
            audio.play().catch(error => {
                console.log('Erro ao reproduzir som:', error);
            });
        } catch (error) {
            console.log('Erro ao criar audio:', error);
        }
    };

    useEffect(() => {
        const fetchQuizData = async () => {
            if (!quizId) {
                setError('ID do quiz não fornecido');
                setLoading(false);
                return;
            }

            try {
                // Buscar perguntas do quiz
                const questionsData = await getQuizQuestionsWithOptions(parseInt(quizId));
                
                // Buscar o quiz completo - priorizar busca por quizId
                let quizData: Quiz;
                try {
                    // Primeiro tentar buscar diretamente pelo quizId
                    quizData = await getQuizById(parseInt(quizId));
                } catch (quizError) {
                    // Se falhar e temos articleId, tentar buscar pelo artigo
                    if (articleId) {
                        try {
                            quizData = await getArticleQuiz(parseInt(articleId));
                        } catch (articleError) {
                            throw quizError; // Re-lançar o erro original
                        }
                    } else {
                        // Fallback - criar objeto básico do quiz
                        quizData = {
                            id: parseInt(quizId),
                            article_id: 1,
                            title: 'Quiz de Conhecimento',
                            description: 'Teste seus conhecimentos',
                            xp_reward: 50,
                            badge_id: null
                        } as Quiz;
                    }
                }

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
    }, [quizId, articleId]);

    const handleAnswerSelect = (questionId: number, optionId: number) => {
        // Verificar se a pergunta já foi respondida - se sim, não permitir mudança
        if (answeredQuestions.has(questionId)) {
            return;
        }

        setSelectedAnswers(prev => ({
            ...prev,
            [questionId]: optionId
        }));

        // Marcar pergunta como respondida
        setAnsweredQuestions(prev => new Set([...prev, questionId]));

        // Verificar se a resposta está correta e reproduzir som
        const currentQuestion = questions.find(q => q.id === questionId);
        if (currentQuestion) {
            const selectedOption = currentQuestion.options.find(opt => opt.id === optionId);
            if (selectedOption?.is_correct) {
                playSound(acertoSound);
            } else {
                playSound(erroSound);
            }
        }
    };

    const handleNextQuestion = () => {
        const currentQuestion = questions[currentQuestionIndex];
        
        // Verificar se a pergunta foi respondida
        if (!answeredQuestions.has(currentQuestion.id)) {
            toast.error('Por favor, selecione uma resposta antes de continuar');
            return;
        }

        // Calcular acertos até a pergunta atual (incluindo ela)
        let correct = 0;
        for (let i = 0; i <= currentQuestionIndex; i++) {
            const question = questions[i];
            const selectedOptionId = selectedAnswers[question.id];
            if (selectedOptionId) {
                const selectedOption = question.options.find(opt => opt.id === selectedOptionId);
                if (selectedOption?.is_correct) {
                    correct++;
                }
            }
        }
        setCorrectAnswers(correct);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            // Última pergunta - finalizar quiz
            handleFinishQuiz();
        }
    };



    const handleFinishQuiz = async () => {
        // Prevenir múltiplas execuções
        if (isFinishing) return;
        setIsFinishing(true);

        try {
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
            const xpEarned = passed ? quiz?.xp_reward || 0 : 0;
            let badgeEarned = false;

            // Se o usuário passou no teste
            if (passed) {
                const rewards: string[] = [];

                // Atualizar XP se houver recompensa
                if (xpEarned > 0) {
                    try {
                        await updateUserXP(xpEarned);
                        rewards.push(`${xpEarned} XP`);
                    } catch (error) {
                        console.error('Erro ao atualizar XP:', error);
                        toast.error('Erro ao atualizar seu XP');
                    }
                }

                // Atribuir badge se o quiz tiver uma badge associada
                if (quiz?.badge_id) {
                    try {
                        await assignUserBadge(quiz.badge_id);
                        badgeEarned = true;
                        rewards.push('Nova Insígnia 🏆');
                    } catch (error: any) {}
                }
            }

            // Reproduzir som de conclusão
            playSound(conclusaoSound);

            // Aguardar um pouco para o som tocar antes de navegar
            setTimeout(() => {
                // Navegar para a página de resultados
                navigate(`/questions-end?score=${score}&passed=${passed}&xpEarned=${xpEarned}&badgeEarned=${badgeEarned}&articleId=${quiz?.article_id || ''}`);
            }, 500);
        } finally {
            setIsFinishing(false);
        }
    };

    if (loading) {
        return (
            <div>
                <section className={styles.questionsGameSection}>
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
                    <p className={styles.xpText}>Acertos: {correctAnswers}/{questions.length}</p>
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
                    {currentQuestion.options.map((option) => {
                        const isQuestionAnswered = answeredQuestions.has(currentQuestion.id);
                        const isSelected = selectedAnswers[currentQuestion.id] === option.id;
                        const isCorrect = option.is_correct;
                        
                        return (
                            <label 
                                key={option.id} 
                                className={`${styles.radioCard} ${
                                    isSelected ? styles.selected : ''
                                } ${
                                    isQuestionAnswered ? styles.disabled : ''
                                } ${
                                    isQuestionAnswered && isSelected && isCorrect ? styles.correct : ''
                                } ${
                                    isQuestionAnswered && isSelected && !isCorrect ? styles.incorrect : ''
                                }`}
                                style={{ 
                                    cursor: isQuestionAnswered ? 'not-allowed' : 'pointer',
                                    opacity: isQuestionAnswered && !isSelected ? 0.6 : 1
                                }}
                            >
                                <input 
                                    type="radio" 
                                    name={`question-${currentQuestion.id}`}
                                    value={option.id}
                                    checked={isSelected}
                                    onChange={() => handleAnswerSelect(currentQuestion.id, option.id)}
                                    disabled={isQuestionAnswered}
                                />
                                <p>{option.option_text}</p>
                            </label>
                        );
                    })}
                </div>

                <div className={styles.buttons}>
                    <button 
                        className={styles.nextButton} 
                        onClick={handleNextQuestion}
                        disabled={
                            !answeredQuestions.has(currentQuestion.id) || 
                            (isFinishing && currentQuestionIndex === questions.length - 1)
                        }
                    >
                        {isFinishing && currentQuestionIndex === questions.length - 1 
                            ? 'Finalizando...' 
                            : currentQuestionIndex === questions.length - 1 
                                ? 'Finalizar' 
                                : 'Próxima'
                        }
                    </button>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default QuestionsGame;