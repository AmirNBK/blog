import React from 'react';
import styles from './LatestPosts.module.css';
import PostCard from '../PostCard/PostCard';
import viewImage from '@/assets/images/View1.png'
import authorImage from '@/assets/images/Image1.png'

const LatestPosts = () => {
    return (
        <div className={styles.latestPostsContainer}>
            <h1 className={styles.heading}>
                Latest Posts
            </h1>

            <div className={styles.posts}>
                <PostCard
                    imageUrl={viewImage}
                    category="Technology"
                    title="The Impact of Technology"
                    description='The Impact of Technology on the Workplace: How Technology is Changing...'
                    authorImageUrl={authorImage}
                    authorName="Tracey Wilson"
                    date="August 20, 2022"
                />
                <PostCard
                    imageUrl={viewImage}
                    category="Technology"
                    title="The Impact of Technology"
                    description='The Impact of Technology on the Workplace: How Technology is Changing...'
                    authorImageUrl={authorImage}
                    authorName="Tracey Wilson"
                    date="August 20, 2022"
                />
                <PostCard
                    imageUrl={viewImage}
                    category="Technology"
                    title="The Impact of Technology"
                    description='The Impact of Technology on the Workplace: How Technology is Changing...'
                    authorImageUrl={authorImage}
                    authorName="Tracey Wilson"
                    date="August 20, 2022"
                />
            </div>
        </div>
    );
};

export default LatestPosts;
