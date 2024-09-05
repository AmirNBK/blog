import NavBar from '@/components/NavBar/NavBar';
import styles from './Home.module.css';
import HeroSection from '@/components/HeroSection/HeroSection';
import LatestPosts from '@/components/LatestPosts.tsx/LatestPosts';
import Footer from '@/components/Footer/Footer';

export default async function Home() {
  let data = await fetch('http://localhost:3000/api/posts/getPosts', { cache: 'no-store' })
  let posts = await data.json()

  // Sorting posts in descending order based on their publishDate.
  posts.sort((a: { publishDate: string | number | Date; }, b: { publishDate: string | number | Date; }) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());


  return (
    <main className={styles.main}>
      <NavBar />
      <HeroSection post={posts[0]} />
      <LatestPosts posts={posts} />
      <Footer />
    </main>
  );
}