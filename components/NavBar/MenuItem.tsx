import React from 'react';
import styles from './NavBar.module.css';
import Link from 'next/link';


const MenuItem = ({ label, link }: { label: string, link: string }) => {
  return <Link href={link} className={styles.menuItem}>{label}</Link>;
};

export default MenuItem;