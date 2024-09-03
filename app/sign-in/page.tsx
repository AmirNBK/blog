'use client';
import React from 'react';
import NavBar from '@/components/NavBar/NavBar';
import styles from './SignIn.module.css';
import Footer from '@/components/Footer/Footer';
import SignUp from '@/components/SignUp/SignUp';
import Login from '@/components/Login/Login';
import { AppProvider, useAppContext } from '@/context/AppContext';

const SignInContent = () => {
    const { isSignUp } = useAppContext();

    return (
        <>
            {isSignUp ? <SignUp /> : <Login />}
        </>
    );
};

export default function SignIn() {
    return (
        <main className={styles.main}>
            <NavBar />
            <AppProvider>
                <SignInContent />
            </AppProvider>
            <Footer />
        </main>
    );
}