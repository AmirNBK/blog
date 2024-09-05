import React from 'react';
import PostCard from '@/components/PostCard/PostCard';
import viewImage from '@/assets/images/View1.png'
import authorImage from '@/assets/images/Image1.png'
import styles from './UserPosts.module.css';

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

}

interface UserPostsProps {
    posts: Post[];
}


const UserPosts: React.FC<UserPostsProps> = ({ posts }) => {
    return (
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
                        id={item._id}
                    />
                ))}
        </div>
    );
};

export default UserPosts;