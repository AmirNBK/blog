import React from 'react';
import styles from './Footer.module.css';
import Image from 'next/image';
import facebook from '@/assets/icons/facebook.svg'
import twitter from '@/assets/icons/twitter.svg'
import youtube from '@/assets/icons/youtube.svg'


const socialIcons = [
  { src: youtube, alt: "youtube" },
  { src: twitter, alt: "Twitter" },
  { src: facebook, alt: "Instagram" }
];

const SocialLinks: React.FC = () => {
  return (
    <div className={styles.socialLinks}>
      {socialIcons.map((icon, index) => (
        <a key={index} href="#" aria-label={`Visit our ${icon.alt} page`}>
          <Image src={icon.src} alt={icon.alt} className={styles.socialIcon} />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;