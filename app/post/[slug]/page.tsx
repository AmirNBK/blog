import NavBar from '@/components/NavBar/NavBar';
import styles from './SinglePost.module.css';
import Footer from '@/components/Footer/Footer';
import BlogPost from '@/components/BlogPost/BlogPost';
import CommentSection from '@/components/CommentsSection/CommentSection';

export default function SinglePost() {
    const blogPostData = {
        category: "Technology",
        title: "The Impact of Technology on the Workplace: How Technology is Changing",
        author: {
            name: "Tracey Wilson",
            avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/e5f03ee1631db88e68046d4d2d94d6c33c007a44901d62b501557caa6e6b79e3?placeholderIfAbsent=true&apiKey=9bd9a95f515e4ad786dbebd9b3bdf63c"
        },
        date: "August 20, 2022",
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/d25990694bbe85ea36a3b339a1d61bd3d9b16f046c6238cff9cae507ee201332?placeholderIfAbsent=true&apiKey=9bd9a95f515e4ad786dbebd9b3bdf63c",
        content: `
            <p>
                Traveling is an enriching experience that opens up new horizons, exposes us to different cultures, and creates memories that last a lifetime. However, traveling can also be stressful and overwhelming, especially if you don't plan and prepare adequately. In this blog article, we'll explore tips and tricks for a memorable journey and how to make the most of your travels.
            </p>
            <br/>
            <p>
                One of the most rewarding aspects of traveling is immersing yourself in the local culture and customs. This includes trying local cuisine, attending cultural events and festivals, and interacting with locals. Learning a few phrases in the local language can also go a long way in making connections and showing respect.
            </p>
            <br/>
             <p>
                Traveling is an enriching experience that opens up new horizons, exposes us to different cultures, and creates memories that last a lifetime. However, traveling can also be stressful and overwhelming, especially if you don't plan and prepare adequately. In this blog article, we'll explore tips and tricks for a memorable journey and how to make the most of your travels.
            </p>
        `
    };

    return (
        <main className={styles.main}>
            <NavBar />
            <div className='my-20'>
                <BlogPost {...blogPostData} />
                <CommentSection />
            </div>
            <Footer />
        </main>
    );
}
