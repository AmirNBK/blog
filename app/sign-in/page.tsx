import NavBar from '@/components/NavBar/NavBar';
import styles from './SignIn.module.css';
import Footer from '@/components/Footer/Footer';
import SignUp from '@/components/SignUp/SignUp';

export default function SignIn() {

    return (
        <main className={styles.main}>
            <NavBar />
            <SignUp />
            <Footer />
        </main>
    );
}