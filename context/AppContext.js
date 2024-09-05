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
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            const fetchUserRole = async () => {
                try {
                    const response = await fetch('/api/users/currentUserDetails', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    const data = await response.json();
                    setIsAdmin(data.isAdmin || false);
                } catch (error) {
                    console.error('Error fetching user role:', error);
                }
            };
            fetchUserRole();
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
        setFetchComments,
        isAdmin,
        setIsAdmin
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};
