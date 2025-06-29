import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import styles from './Paths.module.css';
import { ContentCardContainer } from '../../components/ContentCard';
import { getArticles } from '../../services/articleService';
import type { Article } from '../../services/articleService';

const Paths: React.FC = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const articlesData = await getArticles();
                setArticles(articlesData);
            } catch (err) {
                setError('Erro ao carregar os artigos');
                console.error('Erro ao buscar artigos:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const handleArticleClick = (articleId: string) => {
        console.log('Clicou no artigo:', articleId);
        navigate(`/article/${articleId}`);
    };

    const recentContentItems = articles.map(article => ({
        id: article.id.toString(),
        title: article.title,
        linkText: 'Acessar',
        onClick: () => handleArticleClick(article.id.toString())
    }));

    if (loading) {
        return (
            <div>
                <Header />
                <section className={styles.pathsSection}>
                    <h2 className={styles.sectionTitle}>Nossas Trilhas de Aprendizado</h2>
                    <h3 className={styles.sectionSubtitle}>Dê seu primeiro passo no aprendizado.</h3>
                    <p>Carregando...</p>
                </section>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Header />
                <section className={styles.pathsSection}>
                    <h2 className={styles.sectionTitle}>Nossas Trilhas de Aprendizado</h2>
                    <h3 className={styles.sectionSubtitle}>Dê seu primeiro passo no aprendizado.</h3>
                    <p>Erro: {error}</p>
                </section>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Header />
            <section className={styles.pathsSection}>
                <h2 className={styles.sectionTitle}>Nossas Trilhas de Aprendizado</h2>
                <h3 className={styles.sectionSubtitle}>Dê seu primeiro passo no aprendizado.</h3>

                <ContentCardContainer items={recentContentItems} />
            </section>
            <Footer />
        </div>
    )
};

export default Paths;