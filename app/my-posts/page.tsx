'use client';
import { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar/NavBar';
import styles from './MyPosts.module.css';
import Footer from '@/components/Footer/Footer';
import PostCard from '@/components/PostCard/PostCard';
import viewImage from '@/assets/images/View1.png'
import authorImage from '@/assets/images/Image1.png'
import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';
import { Post } from '@/types/types';

export default function MyPosts() {
    const { isLoggedIn } = useAppContext();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

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
            console.error(err)
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

    // Sorting posts in descending order based on their publishDate.
    posts.sort((a: { publishDate: string | number | Date; }, b: { publishDate: string | number | Date; }) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());


    return (
        <main className={styles.main}>
            <NavBar />

            {isLoggedIn ?
                <>
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
                                    authorId={item.author._id}
                                    editable
                                />
                            ))}
                        </div>
                    </div>
                </>

                :

                <Link href={'/sign-in'} className='text-white text-2xl hover:underline'>
                User is not authenticated, please login or make an account.
                </Link>
        }

            <Footer />
        </main>
    );
}
