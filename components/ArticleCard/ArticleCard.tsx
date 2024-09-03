import React from 'react';
import styles from './ArticleCard.module.css';
import Image, { StaticImageData } from 'next/image';

interface ArticleCardProps {
  category: string;
  title: string;
  author: {
    name: string;
    avatar: string | StaticImageData;
  };
  publishDate: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ category, title, author, publishDate }) => {
  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <span className={styles.badge}>{category}</span>
        <h2 className={styles.title}>{title}</h2>
      </header>
      <div className={styles.metaInfo}>
        <div className={styles.authorInfo}>
          <Image src={author.avatar} alt={`${author.name}'s avatar`} className={styles.authorAvatar} />
          <span className={styles.authorName}>{author.name}</span>
        </div>
        <time className={styles.publishDate}>{publishDate}</time>
      </div>
    </article>
  );
};

export default ArticleCard;