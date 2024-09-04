'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar/NavBar';
import styles from './SinglePost.module.css';
import Footer from '@/components/Footer/Footer';
import BlogPost from '@/components/BlogPost/BlogPost';
import CommentSection from '@/components/CommentsSection/CommentSection';
import image from '@/assets/images/View1.png'
import avatar from '@/assets/icons/emptyUser.png'

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
            avatar: avatar
        },
        date: post.publishDate,
        image: image,
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
