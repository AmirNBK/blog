'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
    const [isSignUp, setIsSignUp] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [fetchComments, setFetchComments] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem('token'); 
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const toggleSignUpLogin = () => {
        setIsSignUp((prev) => !prev);
    };

    const value = {
        isSignUp,
        toggleSignUpLogin,
        isLoggedIn,
        setIsLoggedIn,
        fetchComments,
        setFetchComments
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};
