'use client';
import { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar/NavBar';
import styles from './MyPosts.module.css';
import Footer from '@/components/Footer/Footer';
import PostCard from '@/components/PostCard/PostCard';
import viewImage from '@/assets/images/View1.png'
import authorImage from '@/assets/images/Image1.png'
import Link from 'next/link';

interface Post {
    _id: string;
    category: string;
    title: string;
    content: string;
    authorName: string;
    publishDate: string;
}


export default function MyPosts() {

    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPosts = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('/api/users/currentUserPosts', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }

            const data = await response.json();
            setPosts(data);
        } catch (err) {
            setError('Failed to load posts');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <main className={styles.main}>
            <NavBar />

            <Link href={'/new-story'} className={styles.publishButton}>
                Publish Post
            </Link>

            <div className={styles.latestPostsContainer}>
                <h1 className={styles.heading}>
                    My Posts
                </h1>

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
                    />
                ))}
                </div>
            </div>
            <Footer />
        </main>
    );
}
