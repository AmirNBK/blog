import React, { useState } from 'react';
import styles from './CommentSection.module.css';

const CommentForm: React.FC<{ postId: string | string[] }> = ({ postId }) => {
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!content) {
            setError('Content is required');
            return;
        }

        const token = localStorage.getItem('token'); 

        try {
            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ content, author, postId }),
            });

            if (!response.ok) {
                throw new Error('Failed to post comment');
            }

            const result = await response.json();
            setSuccess('Comment posted successfully!');
            setContent('');
            setAuthor('');
            setError('');
        } catch (error) {
            setError('Failed to post comment');
            console.error(error);
        }
    };

    return (
        <form className={styles.commentForm} onSubmit={handleSubmit}>
            <div className={styles.commentInput}>
                <input
                    className={styles.commentPlaceholder}
                    placeholder="Add a comment"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button type="submit" className={styles.postButton}>Post</button>
            </div>
            <div>
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}
            </div>

        </form>
    );
};

export default CommentForm;
