'use client';
import React from 'react';
import styles from './NavBar.module.css';
import Image from 'next/image';
import logo from '@/assets/icons/Logo.svg';
import { useRouter } from 'next/navigation'
import { useAppContext } from '@/context/AppContext';
import profile from '@/assets/icons/emptyUser.png'
import Link from 'next/link';
import PrimaryButton from '../PrimaryButton/PrimaryButton';

const NavBar: React.FC = () => {
    const router = useRouter()
    const { isLoggedIn } = useAppContext();

    return (
        <header className={styles.header}>
            <nav className={styles.container}>
                <Image loading="lazy" src={logo} className={styles.logo} alt="Company logo"
                    onClick={() => {
                        router.push('/')
                    }}
                />

                {isLoggedIn ?
                    <Link href={'/my-posts'}>
                        <Image src={profile} alt='profile' className={styles.profileAvatar} />
                    </Link>
                    :
                    <PrimaryButton text='Sign-in' hasIcon={false}
                        onClick={() => {
                            router.push('/sign-in')
                        }}
                    />
                }


            </nav>
        </header>
    );
};

export default NavBar;
