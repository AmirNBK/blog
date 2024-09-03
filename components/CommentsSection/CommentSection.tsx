import React from 'react';
import styles from './CommentSection.module.css';
import CommentForm from './CommentForm';
import CommentCard from './CommentCard/CommentCard';
import image from '@/assets/images/image3.png'

const CommentSection = () => {
    const commentData = {
        avatarSrc: image,
        authorName: "Ralph Edwards",
        date: "Aug 19, 2021",
        text: "In mauris porttitor tincidunt mauris massa sit lorem sed scelerisque. Fringilla pharetra vel massa enim sollicitudin cras. At pulvinar eget sociis adipiscing eget donec ultricies nibh tristique.",
    };

    return (
        <section className={styles.commentSection}>
            <CommentForm />
            <div className={styles.commentsLists}>
                <CommentCard {...commentData} />
                <CommentCard {...commentData} />
                <CommentCard {...commentData} />
            </div>
        </section>
    );
};

export default CommentSection;