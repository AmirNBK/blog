import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomEditor from '@/components/CustomEditor/CustomEditor';
import DateTimeInput from '@/components/DateTimeInput/DateTimeInput';
import PrimaryButton from '@/components/PrimaryButton/PrimaryButton';
import styles from './StoryForm.module.css';

interface StoryFormProps {
    initialValues: any;
    validationSchema: Yup.ObjectSchema<any>;
    onSubmit: (values: any) => void;
    isEditing?: boolean;
}

const StoryForm: React.FC<StoryFormProps> = ({ initialValues, validationSchema, onSubmit, isEditing = false }) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
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
                        <PrimaryButton text={isEditing ? "Update" : "Post"} hasIcon={false} width="8/12" />
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default StoryForm;
