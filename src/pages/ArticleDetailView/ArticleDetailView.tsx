import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import styles from './ArticleDetailView.module.css';
import { getArticleById } from '../../services/articleService';
import type { Article } from '../../services/articleService';

const ArticleDetailView: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArticle = async () => {
            if (!id) {
                setError('ID do artigo não fornecido');
                setLoading(false);
                return;
            }

            try {
                const articleData = await getArticleById(parseInt(id));
                setArticle(articleData);
            } catch (err) {
                setError('Erro ao carregar o artigo');
                console.error('Erro ao buscar artigo:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleStartQuiz = () => {
        if (!id) {
            toast.error('ID do artigo não encontrado');
            return;
        }
        
        // Navegar para a página de menu de questões passando o ID do artigo
        navigate(`/questions-menu?articleId=${id}`);
    };

    if (loading) {
        return (
            <div>
                <Header />
                <section className={styles.articleDetailViewSection}>
                    
                </section>
                <Footer />
            </div>
        );
    }

    if (error || !article) {
        return (
            <div>
                <Header />
                <section className={styles.articleDetailViewSection}>
                    <h2 className={styles.sectionTitle}>Erro</h2>
                    <p>{error || 'Artigo não encontrado'}</p>
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
            <section className={styles.articleDetailViewSection}>
                <h2 className={styles.sectionTitle}>{article.title}</h2>
                <h3 className={styles.sectionSubtitle}>
                    Publicado em: {new Date(article.published_at).toLocaleDateString('pt-BR')}
                </h3>

                <div className={styles.articleDetailViewContent}>
                    <div dangerouslySetInnerHTML={{ __html: article.content }} />
                </div>
                
                <div className={styles.articleDetailViewButtons}>
                    <button className={styles.backButton} onClick={handleBackClick}>
                        Voltar
                    </button>
                    <button className={styles.pathViewButton} onClick={handleStartQuiz}>
                        <span className={styles.pathViewButtonText}>Iniciar Perguntas e Respostas</span>
                    </button>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default ArticleDetailView;