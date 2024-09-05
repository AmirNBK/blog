'use client';
import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar/NavBar';
import Footer from '@/components/Footer/Footer';
import PostCard from '@/components/PostCard/PostCard';
import styles from './AdminPanel.module.css';
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

interface Post {
    posts: Post[];
}

const AdminPanel: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/posts/getPosts');
            const data = await res.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchPosts();
    }, []);


    if (loading) return <div>Loading...</div>;

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
                    <select
                        id="sortOrder"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                    >
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>

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
