import { StaticImageData } from "next/image";

export interface Author {
    _id: string;
    name: string;
    email: string;
    password: string;
}

export interface Post {
    _id: string;
    title: string;
    summary?: string;
    content: string;
    publishDate: string;
    author: Author;
    comments: Comment[];
}

export interface Comment {
    _id: string;
    content: string;
    author: string;
    createdAt: string;
    authorName: string
}

export interface BlogPostProps {
    category: string;
    title: string;
    author: {
        name: string;
        avatar: string | StaticImageData;
    };
    date: string;
    image: string | StaticImageData;
    content: string;
}
