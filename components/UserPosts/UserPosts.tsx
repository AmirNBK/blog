import React from 'react';
import PostCard from '@/components/PostCard/PostCard';
import viewImage from '@/assets/images/View1.png'
import authorImage from '@/assets/images/Image1.png'
import styles from './UserPosts.module.css';


const UserPosts = () => {
    return (
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
    );
};

export default UserPosts;