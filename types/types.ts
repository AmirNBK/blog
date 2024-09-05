
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
    
}
