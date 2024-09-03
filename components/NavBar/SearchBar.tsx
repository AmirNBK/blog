import Image from 'next/image';
import React from 'react';
import searchIcon from '@/assets/icons/search.svg'
import styles from './NavBar.module.css';


const SearchBar = ({ placeholder }: { placeholder?: string }) => {
    return (
        <div className={styles.searchBarContainer}>
            <input
                placeholder={placeholder || 'Search'}
                className={styles.searchInput}
            />
            <Image
                src={searchIcon}
                alt='searchIcon'
                className={styles.searchIcon}
            />
        </div>
    );
};

export default SearchBar;