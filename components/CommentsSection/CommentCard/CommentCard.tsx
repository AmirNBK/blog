import React from 'react';
import styles from './CommentCard.module.css';
import Image, { StaticImageData } from 'next/image';

interface CommentCardProps {
    avatarSrc: string | StaticImageData;
    authorName: string;
    date: string;
    text: string;
}

const CommentCard: React.FC<CommentCardProps> = ({
    avatarSrc,
    authorName,
    date,
    text,
}) => {
    return (
        <article className={styles.commentCard}>
            <div className={styles.commentContent}>
                <header className={styles.commentHeader}>
                    <Image loading="lazy" src={avatarSrc} alt={`${authorName}'s avatar`} className={styles.avatarImage} />
                    <div className={styles.commentBody}>
                        <div className={styles.commentInfo}>
                            <div className={styles.authorInfo}>
                                <h2 className={styles.authorName}>{authorName}</h2>
                                <time className={styles.commentDate}>{date}</time>
                            </div>
                            <p className={styles.commentText}>{text}</p>
                        </div>
                    </div>
                </header>
            </div>
        </article>
    );
};

export default CommentCard;