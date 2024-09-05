import NavBar from '@/components/NavBar/NavBar';
import styles from './SinglePost.module.css';
import Footer from '@/components/Footer/Footer';
import BlogPost from '@/components/BlogPost/BlogPost';
import CommentSection from '@/components/CommentsSection/CommentSection';
import image from '@/assets/images/View1.png';
import avatar from '@/assets/icons/emptyUser.png';


export const revalidate = 5 * 60; // 5 minutes

export const dynamicParams = true;

export async function generateStaticParams() {
    try {
        const response = await fetch('http://localhost:3000/api/posts');
        const data = await response.json();

        if (!Array.isArray(data.posts)) {
            throw new Error('Invalid posts data format');
        }

        return data.posts.map((post: { slug: string }) => ({
            slug: post.slug,
        }));
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}

export default async function SinglePost({ params }: { params: { slug: string } }) {
    try {
        const response = await fetch(`http://localhost:3000/api/posts/${params.slug}`);

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const post = await response.json();

        if (!post) {
            return <div>Post not found</div>;
        }

        const blogPostData = {
            category: "Technology",
            title: post.title,
            author: {
                name: post.authorName,
                avatar: avatar
            },
            date: post.publishDate,
            image: image,
            content: post.content
        };

        return (
            <main className={styles.main}>
                <NavBar />
                <div className='my-20'>
                    <BlogPost {...blogPostData} />
                    <CommentSection postId={params.slug} />
                </div>
                <Footer />
            </main>
        );
    } catch (error) {
        console.error('Error fetching post data:', error);
        return <div>Failed to load post data</div>;
    }
}
