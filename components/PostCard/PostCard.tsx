import React from 'react';
import styles from './PostCard.module.css';
import Image, { StaticImageData } from 'next/image';

interface PostCardProps {
    imageUrl: string | StaticImageData;
    category: string;
    title: string;
    description: string;
    authorImageUrl: string | StaticImageData;
    authorName: string;
    date: string;
    editable?: boolean,
    deletable?: boolean
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
    deletable
}) => {

    const MAX_DESCRIPTION_LENGTH = 35;
    const truncatedDescription =
        description.length > MAX_DESCRIPTION_LENGTH
            ? `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
            : description;


    return (
        <article className={styles.postCard}>
            <Image src={imageUrl} alt="" className={styles.postImage} />
            <div className={styles.content}>
                <header className={styles.heading}>
                    <span className={styles.badge}>{category}</span>
                    <h2 className={styles.title}>{title}</h2>
                    <div
                        className={styles.description}
                        dangerouslySetInnerHTML={{ __html: truncatedDescription }}
                    />
                </header>
                <footer className={styles.shortInfo}>
                    <div className={styles.author}>
                        <Image src={authorImageUrl} alt={`${authorName}'s profile`} className={styles.authorImage} />
                        <span className={styles.authorName}>{authorName}</span>
                    </div>
                    <time className={styles.date}>{date}</time>
                </footer>

                <div className='flex flex-row justify-between'>
                    {editable && <p className=' underline text-white mt-6'>
                        Edit
                    </p>}

                    {deletable && <p className=' underline mt-6 text-red-700'>
                        Delete
                    </p>}

                </div>
            </div>
        </article>
    );
};

export default PostCard;