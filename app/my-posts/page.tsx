import NavBar from '@/components/NavBar/NavBar';
import styles from './MyPosts.module.css';
import Footer from '@/components/Footer/Footer';
import PostCard from '@/components/PostCard/PostCard';
import viewImage from '@/assets/images/View1.png'
import authorImage from '@/assets/images/Image1.png'
import Link from 'next/link';

export default function MyPosts() {

    return (
        <main className={styles.main}>
            <NavBar />

            <Link href={'/new-story'} className={styles.publishButton}>
                Publish Post
            </Link>

            <div className={styles.latestPostsContainer}>
                <h1 className={styles.heading}>
                    My Posts
                </h1>

                <div className={styles.posts}>
                    <PostCard
                        imageUrl={viewImage}
                        category="Technology"
                        title="The Impact of Technology"
                        description='The Impact of Technology on the Workplace: How Technology is Changing...'
                        authorImageUrl={authorImage}
                        authorName="Tracey Wilson"
                        date="August 20, 2022"
                        editable
                    />
                    <PostCard
                        imageUrl={viewImage}
                        category="Technology"
                        title="The Impact of Technology"
                        description='The Impact of Technology on the Workplace: How Technology is Changing...'
                        authorImageUrl={authorImage}
                        authorName="Tracey Wilson"
                        date="August 20, 2022"
                        editable
                    />
                    <PostCard
                        imageUrl={viewImage}
                        category="Technology"
                        title="The Impact of Technology"
                        description='The Impact of Technology on the Workplace: How Technology is Changing...'
                        authorImageUrl={authorImage}
                        authorName="Tracey Wilson"
                        date="August 20, 2022"
                        editable
                    />
                </div>
            </div>
            <Footer />
        </main>
    );
}
