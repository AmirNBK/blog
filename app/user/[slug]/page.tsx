import NavBar from '@/components/NavBar/NavBar';
import styles from './UserProfile.module.css';
import Footer from '@/components/Footer/Footer';
import UserDetailCard from '@/components/UserDetailCard/UserDetailCard';
import image from '@/assets/images/Image1.png';
import UserPosts from '@/components/UserPosts/UserPosts';

export const revalidate = 60; 

export const dynamicParams = true;

export async function generateStaticParams() {
    try {
        const response = await fetch('http://localhost:3000/api/users');
        const data = await response.json();

        if (!Array.isArray(data.users)) {
            throw new Error('Invalid users data format');
        }

        return data.users.map((user: { _id: string }) => ({
            id: user._id,
        }));
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}

export default async function UserProfile({ params }: { params: { id: string } }) {

    try {
        if (!params.slug) {
            return <div>Invalid user ID</div>;
        }

        const response = await fetch(`http://localhost:3000/api/users/${params.slug}`);

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const userData = await response.json();

        if (!userData) {
            return <div>User not found</div>;
        }

        console.log(userData);
        

        return (
            <main className={styles.main}>
                <NavBar />
                <div className={styles.container}>
                    <UserDetailCard
                        username={userData.name}
                        email={userData.email}
                        avatarSrc={image}
                        description='Meet Jonathan Doe, a passionate writer and blogger with a love for technology and travel. Jonathan holds a degree in Computer Science and has spent years working in the tech industry, gaining a deep understanding of the impact technology has on our lives.'
                    />
                    {/* <UserPosts posts={userData.posts || []} />  */}
                </div>
                <Footer />
            </main>
        );
    } catch (error) {
        console.error('Error fetching user data:', error);
        return <div>Failed to load user data</div>;
    }
}
