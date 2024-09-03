import NavBar from '@/components/NavBar/NavBar';
import styles from './UserProfile.module.css';
import Footer from '@/components/Footer/Footer';
import UserDetailCard from '@/components/UserDetailCard/UserDetailCard';
import image from '@/assets/images/Image1.png'
import UserPosts from '@/components/UserPosts/UserPosts';

export default function UserProfile() {

    return (
        <main className={styles.main}>
            <NavBar />
            <div className={styles.container}>
                <UserDetailCard
                    username='Jonathan Doe'
                    email='test2@gmail.com'
                    avatarSrc={image}
                    description="Meet Jonathan Doe, a passionate writer and blogger with a love for technology and travel. Jonathan holds a degree in Computer Science and has spent years working in the tech industry, gaining a deep understanding of the impact technology has on our lives."
                />
                <UserPosts />
            </div>
            <Footer />
        </main>
    );
}