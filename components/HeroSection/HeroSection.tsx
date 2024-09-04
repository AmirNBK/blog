import React from 'react';
import image1 from '@/assets/images/Image1.png';
import ArticleCard from '../ArticleCard/ArticleCard';
import Image from 'next/image';
import image2 from '@/assets/images/Image2.png';
import styles from './HeroSection.module.css';

const HeroSection = ({ post }: { post: any }) => {
    const articleData = {
        id : post._id,
        category: "Technology",
        title: post.title,
        author: {
            name: post.author.name,
            avatar: image1
        },
        publishDate: new Date(post.publishDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    };

    return (
        <div className={styles.heroSectionContainer}>
            <Image src={image2} alt='HeroSection image' className={styles.heroSectionImage} />
            <div className={styles.articleCardContainer}>
                <ArticleCard {...articleData} />
            </div>
        </div>
    );
};

export default HeroSection;
