import React from 'react';
import image1 from '@/assets/images/Image1.png';
import ArticleCard from '../ArticleCard/ArticleCard';
import Image from 'next/image';
import image2 from '@/assets/images/Image2.png';
import styles from './HeroSection.module.css';

const HeroSection = () => {
    const articleData = {
        category: "Technology",
        title: "The Impact of Technology on the Workplace: How Technology is Changing",
        author: {
            name: "Jason Francisco",
            avatar: image1
        },
        publishDate: "August 20, 2022"
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
