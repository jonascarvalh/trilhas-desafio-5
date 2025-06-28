import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import styles from './Paths.module.css';
import { ContentCardContainer } from '../../components/ContentCard';

const Paths: React.FC = () => {
    const recentContentItems = [
        {
            id: '1',
            title: 'Entendendo a IA',
            linkText: 'Acessar',
            linkHref: '#',
            onClick: () => console.log('Clicou em Entendendo a IA')
        },
        {
            id: '2',
            title: 'IA na Rotina',
            linkText: 'Acessar',
            linkHref: '#',
            onClick: () => console.log('Clicou em IA na Rotina')
        },
        {
            id: '3',
            title: 'Empreender com IA',
            linkText: 'Acessar',
            linkHref: '#',
            onClick: () => console.log('Clicou em Empreender com IA')
        }
    ];
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