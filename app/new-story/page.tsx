'use client';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import NavBar from '@/components/NavBar/NavBar';
import styles from './NewStory.module.css';
import Footer from '@/components/Footer/Footer';
import CustomEditor from '@/components/CustomEditor/CustomEditor';
import DateTimeInput from '@/components/DateTimeInput/DateTimeInput';
import PrimaryButton from '@/components/PrimaryButton/PrimaryButton';

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required('Title is required')
        .min(5, 'Title must be at least 5 characters long'),
    content: Yup.string()
        .required('Content is required')
        .min(20, 'Content must be at least 20 characters long'),
    dateTime: Yup.date()
        .required('Date and time are required')
        .min(new Date(), 'Date and time cannot be in the past'),
});

export default function NewStory() {
    return (
        <main className={styles.main}>
            <NavBar />
            <h1 className={styles.Publish}>Publish a new post</h1>
            <Formik
                initialValues={{ title: '', content: 'Start creating your new post!', dateTime: '' }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log('Form values:', values);
                }}
            >
                {({ setFieldValue }) => (
                    <Form className={styles.form}>
                        <div className={styles.textCenter}>
                            <Field
                                name="title"
                                placeholder="Please enter your post title"
                                className={styles.input}
                            />
                            <ErrorMessage name="title" component="div" className={styles.error} />
                        </div>
                        <CustomEditor setFieldValue={setFieldValue} />
                        <ErrorMessage name="content" component="div" className={styles.contentError} />
                        <DateTimeInput setFieldValue={setFieldValue} />
                        <ErrorMessage name="dateTime" component="div" className={styles.error} />
                        <div className={`${styles.buttonContainer}`}>
                            <PrimaryButton text="Post" hasIcon={false} width="8/12" />
                        </div>
                        <Footer />
                    </Form>
                )}
            </Formik>
        </main>
    );
}