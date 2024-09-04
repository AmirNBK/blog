'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import NavBar from '@/components/NavBar/NavBar';
import Footer from '@/components/Footer/Footer';
import * as Yup from 'yup';
import styles from './EditStory.module.css';
import StoryForm from '@/components/StoryForm/StoryForm';

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required('Title is required')
        .min(5, 'Title must be at least 5 characters long'),
    content: Yup.string()
        .required('Content is required')
        .min(20, 'Content must be at least 20 characters long'),
});

const EditStory: React.FC = () => {
    const [initialValues, setInitialValues] = useState<any>({
        title: '',
        content: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { slug } = useParams(); 


    useEffect(() => {
        if (slug) {
            const fetchPost = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const response = await fetch(`http://localhost:3000/api/posts/${slug}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setInitialValues({
                            title: data.title,
                            content: data.content,
                        });
                        setLoading(false);
                    } else {
                        const data = await response.json();
                        setError(data.message || 'Failed to fetch post');
                    }
                } catch (error) {
                    setError('An error occurred while fetching the post');
                }
            };

            fetchPost();
        }
    }, [slug]);

    const handlePostSubmit = async (values: any) => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`http://localhost:3000/api/posts/updatePosts?slug=${slug}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: values.title,
                    content: values.content,
                    publishDate: values.dateTime,
                }),
            });

            if (response.ok) {
                alert('Your post updated');
            } else {
                const data = await response.json();
                console.error('Error:', data.message || 'Failed to update post');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <main className={styles.main}>
            <NavBar />
            <h1 className={styles.Publish}>Edit your post</h1>
            {error ? <p>{error}</p> : (
                <StoryForm
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handlePostSubmit}
                    isEditing
                />
            )}
            <Footer />
        </main>
    );
};

export default EditStory;
