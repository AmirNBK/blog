import React from 'react';
import styles from './BlogPost.module.css';

interface BlogPostProps {
    category: string;
    title: string;
    author: {
        name: string;
        avatar: string;
    };
    date: string;
    image: string;
    content: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ category, title, author, date, image, content }) => {
    return (
        <article className={styles.blogContainer}>
            <header className={styles.blogContent}>
                <div className={styles.blogHeader}>
                    <span className={styles.categoryBadge}>{category}</span>
                    <h1 className={styles.blogTitle}>{title}</h1>
                </div>
                <div className={styles.blogMeta}>
                    <div className={styles.authorInfo}>
                        <img src={author.avatar} alt={`${author.name}'s avatar`} className={styles.authorAvatar} />
                        <span className={styles.authorName}>{author.name}</span>
                    </div>
                    <time className={styles.publishDate} dateTime={date}>{date}</time>
                </div>
            </header>
            <img src={image} alt="Blog post main image" className={styles.blogImage} />
            <div className={styles.blogContent} dangerouslySetInnerHTML={{ __html: content }} />
        </article>
    );
};

export default BlogPost;
