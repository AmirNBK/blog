import React from 'react';
import styles from './PostCard.module.css';
import Image, { StaticImageData } from 'next/image';

interface PostCardProps {
    imageUrl: string | StaticImageData;
    category: string;
    title: string;
    description: string;
    authorImageUrl: string | StaticImageData;
    authorName: string;
    date: string;
}

const PostCard: React.FC<PostCardProps> = ({
    imageUrl,
    category,
    title,
    description,
    authorImageUrl,
    authorName,
    date
}) => {
    return (
        <article className={styles.postCard}>
            <Image src={imageUrl} alt="" className={styles.postImage} />
            <div className={styles.content}>
                <header className={styles.heading}>
                    <span className={styles.badge}>{category}</span>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.description}>
                        {description}
                    </p>
                </header>
                <footer className={styles.shortInfo}>
                    <div className={styles.author}>
                        <Image src={authorImageUrl} alt={`${authorName}'s profile`} className={styles.authorImage} />
                        <span className={styles.authorName}>{authorName}</span>
                    </div>
                    <time className={styles.date}>{date}</time>
                </footer>
            </div>
        </article>
    );
};

export default PostCard;