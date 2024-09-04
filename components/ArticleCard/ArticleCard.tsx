import React from 'react';
import styles from './ArticleCard.module.css';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

interface ArticleCardProps {
  id : string;
  category: string;
  title: string;
  author: {
    name: string;
    avatar: string | StaticImageData;
  };
  publishDate: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ category, title, author, publishDate , id }) => {
  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <span className={styles.badge}>{category}</span>
        <Link href={`/post/${id}`} className={styles.title}>{title}</Link>
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