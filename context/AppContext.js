'use client';
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
    const [isSignUp, setIsSignUp] = useState(true);

    const toggleSignUpLogin = () => {
        setIsSignUp((prev) => !prev);
    };

    const value = {
        isSignUp,
        toggleSignUpLogin,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};
