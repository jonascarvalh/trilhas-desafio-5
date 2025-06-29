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
  linkHref,
  onClick 
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('ContentCard clicked, onClick exists:', !!onClick);
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={styles.recentContentCard}>
      <p className={styles.recentContentCardTitle}>{title}</p>
      {linkHref ? (
        <a 
          className={styles.recentContentCardLink} 
          href={linkHref}
          onClick={handleClick}
        >
          {linkText}
        </a>
      ) : (
        <button 
          className={styles.recentContentCardLink} 
          onClick={handleClick}
        >
          {linkText}
        </button>
      )}
    </div>
  );
};

export default ContentCard; 