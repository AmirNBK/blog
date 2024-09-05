import React from 'react';
import styles from './LatestPosts.module.css';
import PostCard from '../PostCard/PostCard';
import viewImage from '@/assets/images/View1.png';
import authorImage from '@/assets/images/Image1.png';
import { Post } from '@/types/types';

const LatestPosts = ({ posts }: { posts: Post[] }) => {

    // Filters the posts array to include only posts that are published.
    const activePosts = posts.filter((post) => new Date(post.publishDate) <= new Date());

    return (
        <div className={styles.latestPostsContainer}>
            <h1 className={styles.heading}>Latest Posts</h1>

            <div className={styles.posts}>
                {activePosts.map((item) => (
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
                        id={item._id}
                        authorId={item.author._id}
                    />
                ))}
            </div>
        </div>
    );
};

export default LatestPosts;
