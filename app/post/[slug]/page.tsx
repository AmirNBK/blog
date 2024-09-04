'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar/NavBar';
import styles from './SinglePost.module.css';
import Footer from '@/components/Footer/Footer';
import BlogPost from '@/components/BlogPost/BlogPost';
import CommentSection from '@/components/CommentsSection/CommentSection';

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

export default function SinglePost() {
    const { slug } = useParams(); 
    const [post, setPost] = useState<BlogPostProps>(null);

    useEffect(() => {
        if (slug) {
            fetch(`/api/posts/${slug}`)
                .then((response) => response.json())
                .then((data) => setPost(data))
                .catch((error) => console.error('Error fetching post:', error));
        }
    }, [slug]);

    if (!post) {
        return <div>Loading...</div>;
    }
    

    const blogPostData = {
        category: "Technology",
        title: post.title,
        author: {
            name: post.authorName,
            avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/e5f03ee1631db88e68046d4d2d94d6c33c007a44901d62b501557caa6e6b79e3?placeholderIfAbsent=true&apiKey=9bd9a95f515e4ad786dbebd9b3bdf63c"
        },
        date: post.publishDate,
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/d25990694bbe85ea36a3b339a1d61bd3d9b16f046c6238cff9cae507ee201332?placeholderIfAbsent=true&apiKey=9bd9a95f515e4ad786dbebd9b3bdf63c",
        content: post.content
    };

    return (
        <main className={styles.main}>
            <NavBar />
            <div className='my-20'>
                <BlogPost {...blogPostData} />
                <CommentSection postId={slug} />
            </div>
            <Footer />
        </main>
    );
}
