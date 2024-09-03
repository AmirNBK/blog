import React from 'react';
import styles from './Footer.module.css';

const socialIcons = [
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/5a94bcfeb3d7033aa84106aad7477b46bc1d7aaf5db9dc34b66909e1a1d2a681?placeholderIfAbsent=true&apiKey=9bd9a95f515e4ad786dbebd9b3bdf63c", alt: "Facebook" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/1b4e9b9b57e43a6ad7119dbfb60387cef5aee57aaac38754ba7020c326be3490?placeholderIfAbsent=true&apiKey=9bd9a95f515e4ad786dbebd9b3bdf63c", alt: "Twitter" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/1d82b2b1630e0ea4c1bbbc2a6d6806fa40db76b07272fd7fa41f58fc5b290166?placeholderIfAbsent=true&apiKey=9bd9a95f515e4ad786dbebd9b3bdf63c", alt: "Instagram" }
];

const SocialLinks: React.FC = () => {
  return (
    <div className={styles.socialLinks}>
      {socialIcons.map((icon, index) => (
        <a key={index} href="#" aria-label={`Visit our ${icon.alt} page`}>
          <img src={icon.src} alt={icon.alt} className={styles.socialIcon} />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;