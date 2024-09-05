import React from 'react';
import styles from './Footer.module.css';
import FooterNav from './FooterNav';
import SocialLinks from './SocialLinks';

const Footer = () => {
    return (
        <footer className={styles.footer}>
                    <div className={styles.footerContent}>
                        <FooterNav />
                        <SocialLinks />
                        <div className={styles.copyright}>© Copyright 2024 - AmirNBK</div>
                    </div>
        </footer>
    );
};

export default Footer;