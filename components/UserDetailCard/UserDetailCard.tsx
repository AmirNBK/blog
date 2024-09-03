import Image, { StaticImageData } from 'next/image';
import React from 'react';
import styles from './UserDetailCard.module.css';

const UserDetailCard = ({ username, avatarSrc, email, description }: { username: string, avatarSrc: string | StaticImageData, email: string, description: string }) => {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <Image src={avatarSrc} alt='avatar' className={styles.avatar} width={64} height={64} />
                <div className={styles.userInfo}>
                    <p>{username}</p>
                    <p className={styles.email}>{email}</p>
                </div>
            </div>

            <p className={styles.description}>
                {description}
            </p>
        </div>
    );
};

export default UserDetailCard;
