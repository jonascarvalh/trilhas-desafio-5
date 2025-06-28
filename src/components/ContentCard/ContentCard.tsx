import React from 'react';
import styles from './ContentCard.module.css';

interface ContentCardProps {
  title: string;
  linkText?: string;
  linkHref?: string;
  onClick?: () => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ 
  title, 
  linkText = "Acessar", 
  linkHref = "#",
  onClick 
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={styles.recentContentCard}>
      <p className={styles.recentContentCardTitle}>{title}</p>
      <a 
        className={styles.recentContentCardLink} 
        href={linkHref}
        onClick={handleClick}
      >
        {linkText}
      </a>
    </div>
  );
};

export default ContentCard; 