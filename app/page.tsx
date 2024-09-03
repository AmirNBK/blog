import NavBar from '@/components/NavBar/NavBar';
import styles from './Home.module.css';
import HeroSection from '@/components/HeroSection/HeroSection';
import LatestPosts from '@/components/LatestPosts.tsx/LatestPosts';
import Footer from '@/components/Footer/Footer';

export default function Home() {

  return (
    <main className={styles.main}>
      <NavBar />
      <HeroSection />
      <LatestPosts />
      <Footer />
    </main>
  );
}
