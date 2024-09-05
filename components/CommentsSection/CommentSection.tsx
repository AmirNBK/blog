'use client';
import React, { useEffect, useState } from 'react';
import styles from './CommentSection.module.css';
import CommentForm from './CommentForm';
import CommentCard from './CommentCard/CommentCard';
import image from '@/assets/images/image3.png';
import { Comment } from '@/types/types';
import { useAppContext } from '@/context/AppContext';

const CommentSection = ({ postId }: { postId: string | string[] }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { fetchComments } = useAppContext();

    const fetchCommentsFunc = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/comments/getComments?postId=${postId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }

            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error(error);
            setError('Failed to load comments');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCommentsFunc();
    }, [postId , fetchComments]);

    return (
        <section className={styles.commentSection}>
            <CommentForm postId={postId} />
            {loading ? (
                <div className='text-white mx-auto mt-12'>
                    Loading comments...
                </div>
            ) : error ? (
                <div className='text-white mx-auto mt-12'>
                    {error}
                </div>
            ) : comments.length > 0 ? (
                <div className={styles.commentsLists}>
                    {comments.map((item, index) => (
                        <CommentCard
                            avatarSrc={image}
                            authorName={item.authorName}
                            text={item.content}
                            date={new Date(item.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                            key={item._id}
                        />
                    ))}
                </div>
            ) : (
                <div className='text-white mx-auto mt-12'>
                    No comments for this post.
                </div>
            )}
        </section>
    );
};

export default CommentSection;
