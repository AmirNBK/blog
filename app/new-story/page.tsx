'use client';
import React from 'react';
import NavBar from '@/components/NavBar/NavBar';
import Footer from '@/components/Footer/Footer';
import * as Yup from 'yup';
import styles from './NewStory.module.css';
import StoryForm from '@/components/StoryForm/StoryForm';

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required('Title is required')
        .min(5, 'Title must be at least 5 characters long'),
    content: Yup.string()
        .required('Content is required')
        .min(20, 'Content must be at least 20 characters long'),
    dateTime: Yup.date()
        .required('Date and time are required')
        .min(new Date(), 'Date and time cannot be in the past'),
});

const NewStory: React.FC = () => {
    const handlePostSubmit = async (values: any) => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:3000/api/posts', {
                method: 'POST',
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
                alert('Your post submitted');
            } else {
                const data = await response.json();
                console.error('Error:', data.message || 'Failed to create post');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <main className={styles.main}>
            <NavBar />
            <h1 className={styles.Publish}>Publish a new post</h1>
            <StoryForm
                initialValues={{ title: '', content: 'Start creating your new post!', dateTime: '' }}
                validationSchema={validationSchema}
                onSubmit={handlePostSubmit}
            />
            <Footer />
        </main>
    );
};

export default NewStory;
