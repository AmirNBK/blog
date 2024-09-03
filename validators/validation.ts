export const validate = (values: { username: string; email: string; password: string; confPassword: string; }) => {
    const errors: { username?: string; email?: string; password?: string; confPassword?: string } = {};

    if (!values.username) {
        errors.username = 'Username is required';
    } else if (values.username.length < 3) {
        errors.username = 'Must be 3 characters or more';
    }

    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password.length < 6) {
        errors.password = 'Must be 6 characters or more';
    }

    if (!values.confPassword) {
        errors.confPassword = 'Confirm password is required';
    } else if (values.confPassword !== values.password) {
        errors.confPassword = 'Passwords must match';
    }

    return errors;
};