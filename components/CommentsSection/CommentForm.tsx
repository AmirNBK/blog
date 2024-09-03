import React from 'react';
import styles from './CommentSection.module.css';

const CommentForm = () => {
    return (
        <form className={styles.commentForm}>
            <div className={styles.commentInput}>
                <input
                    type="text"
                    className={styles.commentPlaceholder}
                    placeholder="Add a comment"
                />
                <button type="submit" className={styles.postButton}>Post</button>
            </div>
        </form>
    );
};

export default CommentForm;