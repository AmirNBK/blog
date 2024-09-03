import NavBar from '@/components/NavBar/NavBar';
import styles from './MyPosts.module.css';
import Footer from '@/components/Footer/Footer';

export default function MyPosts() {

    return (
        <main className={styles.main}>
            <NavBar />

            <Footer />
        </main>
    );
}
