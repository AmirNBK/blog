import React from 'react';
import styles from './Footer.module.css';

const navItems = ['Home', 'Experience', 'News', 'About us', 'Jobs', 'Contact'];

const FooterNav: React.FC = () => {
    return (
        <nav className={styles.footerNav}>
            {navItems.map((item, index) => (
                <a key={index} href={`#${item.toLowerCase().replace(' ', '-')}`}>{item}</a>
            ))}
        </nav>
    );
};

export default FooterNav;