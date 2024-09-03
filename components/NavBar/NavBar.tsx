import React from 'react';
import styles from './NavBar.module.css';
import MenuItem from './MenuItem';
import Image from 'next/image';
import logo from '@/assets/icons/Logo.svg'
import SearchBar from './SearchBar';

const menuItems = ['Home', 'Blog', 'Single Post', 'Pages', 'Contact'];

const NavBar = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.container}>
                <Image loading="lazy" src={logo} className={styles.logo} alt="Company logo" />
                <div className={styles.menu}>
                    {menuItems.map((item, index) => (
                        <MenuItem key={index} label={item} />
                    ))}
                </div>
                <SearchBar />
            </nav>
        </header>
    );
};

export default NavBar;