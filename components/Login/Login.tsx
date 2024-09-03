"use client";
import React, { useState } from 'react';
import email from '@/assets/icons/EmailGray.svg';
import lock from '@/assets/icons/LockKey.svg';
import { useFormik } from 'formik';
import { validate } from '@/validators/validation';
import AuthInput from '../AuthInput/AuthInput';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import styles from './Login.module.css';
import { useAppContext } from '@/context/AppContext';


const Login = () => {
    const [initialSubmit, setInitialSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { toggleSignUpLogin } = useAppContext();


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
        validateOnBlur: false,
        validateOnChange: initialSubmit ? true : false,
        onSubmit: async (values, { resetForm }) => {
            setLoading(true);
            setError('');
            setSuccess('');

            try {
                const response = await fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: values.email,
                        password: values.password,
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    setSuccess('You logged in successfully');

                    if (data.token) {
                        localStorage.setItem('token', data.token);
                    }

                    resetForm();

                    setTimeout(() => {
                        window.location.href = '/';
                    }, 1000);
                } else {
                    setError(data.error || 'Failed to login.');
                }
            } catch (err) {
                setError('An error occurred. Please try again later.');
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <div className={styles.signUp}>
            <h2 className={styles.title}>
                Login
            </h2>

            <p className={styles.subtitle}>
                Welcome back! Enter your details and start creating.
            </p>

            {error && <p className="text-red-400">{error}</p>}
            {success && <p className="text-green-400">{success}</p>}

            <form onSubmit={formik.handleSubmit}>
                <div className={styles.formGroup}>

                    <AuthInput placeholder='Email Address' icon={email} type='email'
                        name='email'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        borderColor={formik.errors.email ? 'red-400' : ''}
                    />
                    {formik.errors.email ? <p className={styles.errorMessage}>{formik.errors.email}</p> : null}

                    <AuthInput placeholder='Password' icon={lock} type='password'
                        name='password'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        borderColor={formik.errors.password ? 'red-400' : ''}
                    />
                    {formik.errors.password ? <p className={styles.errorMessage}>{formik.errors.password}</p> : null}

                </div>
                <p className="text-base cursor-pointer text-blue-500 hover:underline mt-3" onClick={toggleSignUpLogin}>
                    Don't have an account? Click here
                </p>
                <div className={styles.buttonWrapper}>
                    <PrimaryButton text={loading ? 'Logging in...' : 'Login'} hasIcon={false} width='8/12'
                        onClick={() => {
                            setInitialSubmit(true);
                        }}
                    />
                </div>
            </form>
        </div>
    );
};

export default Login;
