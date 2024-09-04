import React, { useEffect, useState } from 'react';
import styles from './CommentSection.module.css';
import CommentForm from './CommentForm';
import CommentCard from './CommentCard/CommentCard';
import image from '@/assets/images/image3.png'

interface Comment {
    _id: string;
    content: string;
    author: string;
    createdAt: string;
    authorName: string
}

const CommentSection = ({ postId }: { postId: string | string[] }) => {

    const [comments, setComments] = useState<Comment[]>([]);

    const fetchComments = async () => {
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
        }
    };

    useEffect(() => {

        fetchComments();
    }, [postId]);


    return (
        <section className={styles.commentSection}>
            <CommentForm postId={postId} />
            <div className={styles.commentsLists}>
                {comments.map((item, index) => {
                    return (
                        <CommentCard avatarSrc={image} authorName={item.authorName} text={item.content} date={new Date(item.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })} key={index} />
                    )
                })}
            </div>
        </section>
    );
};

export default CommentSection;