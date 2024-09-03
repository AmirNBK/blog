'use client';
import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar/NavBar';
import Footer from '@/components/Footer/Footer';
import PostCard from '@/components/PostCard/PostCard';
import styles from './AdminPanel.module.css';
import viewImage from '@/assets/images/View1.png';
import authorImage from '@/assets/images/Image1.png';
import { StaticImageData } from 'next/image';

interface Post {
    imageUrl: string | StaticImageData;
    category: string;
    title: string;
    description: string;
    authorImageUrl: string | StaticImageData;
    authorName: string;
    editable: boolean
    deletable: boolean
    date: string;
}

const postsData: Post[] = [
    {
        imageUrl: viewImage,
        category: "Technology",
        title: "The Impact of Technology",
        description: "The Impact of Technology on the Workplace: How Technology is Changing...",
        authorImageUrl: authorImage,
        authorName: "Tracey Wilson",
        date: "August 20, 2022",
        editable: true,
        deletable: true
    },
    {
        imageUrl: viewImage,
        category: "Technology",
        title: "AI in Healthcare",
        description: "How AI is Revolutionizing the Healthcare Industry...",
        authorImageUrl: authorImage,
        authorName: "John Doe",
        date: "January 15, 2023",
        editable: true,
        deletable: true
    },
    {
        imageUrl: viewImage,
        category: "Technology",
        title: "Blockchain and Finance",
        description: "The Future of Finance: How Blockchain is Changing the Game...",
        authorImageUrl: authorImage,
        authorName: "Jane Smith",
        date: "March 30, 2023",
        editable: true,
        deletable: true
    }
];


const AdminPanel: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>(postsData);
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

    useEffect(() => {
        sortPosts(sortOrder);
    }, [sortOrder]);

    const sortPosts = (order: 'newest' | 'oldest') => {
        const sortedPosts = [...posts].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return order === 'newest' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
        });
        setPosts(sortedPosts);
    };

    return (
        <main className={styles.main}>
            <NavBar />
            <div className={styles.allPostsContainer}>
                <h1 className={styles.title}>
                    Admin panel
                </h1>

                <p className={styles.heading}>
                    All posts
                </p>

                <div className={styles.sortOptions}>
                    <label htmlFor="sortOrder" className={styles.sortLabel}>Sort by : </label>
                    <select id="sortOrder" value={sortOrder} onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>

                <div className={styles.posts}>
                    {posts.map((post, index) => (
                        <PostCard
                            key={index}
                            imageUrl={post.imageUrl}
                            category={post.category}
                            title={post.title}
                            description={post.description}
                            authorImageUrl={post.authorImageUrl}
                            authorName={post.authorName}
                            date={post.date}
                            editable
                            deletable
                        />
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default AdminPanel;
