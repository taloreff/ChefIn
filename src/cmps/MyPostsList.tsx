import React from 'react';
import MyPostsPreview from '../cmps/MyPostsPreview';
import { Post } from '../types/Post';

interface MyPostsListProps {
    posts: Post[];
}

const MyPostsList: React.FC<MyPostsListProps> = ({ posts }) => {
    return (
        <div className="posts-grid">
            {posts.map(post => (
                <MyPostsPreview key={post._id} post={post} />
            ))}
        </div>
    );
};

export default MyPostsList;
