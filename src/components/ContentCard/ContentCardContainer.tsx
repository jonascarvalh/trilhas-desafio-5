import React from 'react';
import ContentCard from './ContentCard';
import styles from './ContentCardContainer.module.css';

export interface ContentItem {
  id: string;
  title: string;
  linkText?: string;
  linkHref?: string;
  onClick?: () => void;
}

interface ContentCardContainerProps {
  items: ContentItem[];
  className?: string;
}

const ContentCardContainer: React.FC<ContentCardContainerProps> = ({ 
  items, 
  className 
}) => {
  return (
    <div className={`${styles.recentContentCards} ${className || ''}`}>
      {items.map((item) => (
        <ContentCard
          key={item.id}
          title={item.title}
          linkText={item.linkText}
          linkHref={item.linkHref}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
};

export default ContentCardContainer; 