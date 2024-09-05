import React from 'react';
import styles from './PostCard.module.css';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

interface PostCardProps {
    imageUrl: string | StaticImageData;
    category: string;
    title: string;
    description: string;
    authorImageUrl: string | StaticImageData;
    authorName: string;
    date: string;
    editable?: boolean,
    deletable?: boolean,
    id: string,
    authorId : string
}

const PostCard: React.FC<PostCardProps> = ({
    imageUrl,
    category,
    title,
    description,
    authorImageUrl,
    authorName,
    date,
    editable,
    deletable,
    id,
    authorId
}) => {

    const MAX_DESCRIPTION_LENGTH = 35;
    const truncatedDescription =
        description.length > MAX_DESCRIPTION_LENGTH
            ? `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
            : description;

            const handleDelete = async () => {
                if (confirm('Are you sure you want to delete this post?')) {
                    try {
                        const response = await fetch(`/api/posts/deletePosts?id=${id}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                            },
                        });
            
                        const data = await response.json();
                        if (response.ok) {
                            alert(data.message);
                            window.location.reload();
                        } else {
                            alert(data.error);
                        }
                    } catch (error) {
                        console.error('Error:', error);
                        alert('Failed to delete post');
                    }
                }
            };
            


    return (
        <article className={styles.postCard}>
            <Image src={imageUrl} alt="view image" className={styles.postImage} />
            <div className={styles.content}>
                <header className={styles.heading}>
                    <span className={styles.badge}>{category}</span>
                    <Link href={`/post/${id}`} className={styles.title}>{title}</Link>
                    <div
                        className={styles.description}
                        dangerouslySetInnerHTML={{ __html: truncatedDescription }}
                    />
                </header>
                <footer className={styles.shortInfo}>
                    <div className={styles.author}>
                        <Link href={`/user/${authorId}`}>
                        <Image src={authorImageUrl} alt={`${authorName}'s profile`} className={styles.authorImage} />
                        </Link>
                        <Link href={`/user/${authorId}`}>
                        <span className={styles.authorName}>{authorName}</span>
                        </Link>
                    </div>
                    <time className={styles.date}>{date}</time>
                </footer>

                <div className={styles.postActions}>
                    {editable && <Link href={`/edit-story/${id}`} className={styles.editButton}>
                        Edit
                    </Link>}

                    {deletable && <p className={styles.deleteButton} onClick={handleDelete}>
                        Delete
                    </p>}
                </div>
            </div>
        </article>
    );
};

export default PostCard;