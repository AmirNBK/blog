import React from 'react';
import styles from './NavBar.module.css';


const MenuItem = ({ label }: { label: string }) => {
  return <div className={styles.menuItem}>{label}</div>;
};

export default MenuItem;