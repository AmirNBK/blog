import NavBar from '@/components/NavBar/NavBar';
import styles from './Home.module.css';
import HeroSection from '@/components/HeroSection/HeroSection';
import LatestPosts from '@/components/LatestPosts.tsx/LatestPosts';
import Footer from '@/components/Footer/Footer';

export default async function Home() {
  let data = await fetch('http://localhost:3000/api/posts/getPosts', { cache: 'no-store' })
  let posts = await data.json()

  posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());


  return (
    <main className={styles.main}>
      <NavBar />
      <HeroSection post={posts[0]} />
      <LatestPosts posts={posts} />
      <Footer />
    </main>
  );
}