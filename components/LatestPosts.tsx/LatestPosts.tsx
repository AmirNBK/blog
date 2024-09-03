import React from 'react';
import styles from './LatestPosts.module.css';
import PostCard from '../PostCard/PostCard';
import viewImage from '@/assets/images/View1.png';
import authorImage from '@/assets/images/Image1.png';

interface Author {
    _id: string;
    name: string;
    email: string;
    password: string;
}

interface Post {
    _id: string;
    title: string;
    summary?: string;
    content: string;
    publishDate: string;
    author: Author;
    comments: Comment[];
}

interface Comment {
    // Add properties if the comments array is supposed to hold data
}

interface LatestPostsProps {
    posts: Post[];
}

const LatestPosts: React.FC<LatestPostsProps> = ({ posts }) => {

    return (
        <div className={styles.latestPostsContainer}>
            <h1 className={styles.heading}>Latest Posts</h1>

            <div className={styles.posts}>
                {posts.map((item) => (
                    <PostCard
                        key={item._id}
                        imageUrl={viewImage}
                        category="Technology"
                        title={item.title}
                        description={item.content}
                        authorImageUrl={authorImage}
                        authorName={item.author.name}
                        date={new Date(item.publishDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    />
                ))}
            </div>
        </div>
    );
};

export default LatestPosts;
