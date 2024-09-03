import React, { useState } from 'react';
import styles from './DateTimeInput.module.css';

const DateTimeInput: React.FC<{ setFieldValue: (field: string, value: any) => void }> = ({ setFieldValue }) => {
    const [dateTime, setDateTime] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setDateTime(value);
        setFieldValue('dateTime', value);
    };

    return (
        <div className={styles.datetimeContainer}>
            <label htmlFor="datetime" className={styles.datetimeLabel}>
                Select Date and Time to publish
            </label>
            <input
                type="datetime-local"
                id="datetime"
                value={dateTime}
                onChange={handleChange}
                className={styles.datetimeInput}
            />
        </div>
    );
};

export default DateTimeInput;