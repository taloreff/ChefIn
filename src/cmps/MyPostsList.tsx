import React from 'react';
import MyPostsPreview from '../cmps/MyPostsPreview';
import { Post } from '../types/Post';

interface MyPostsListProps {
    posts: Post[];
    onEdit: (post: Post) => void;
    onDelete: (postId: string) => void;
}

function MyPostsList({ posts, onEdit, onDelete }: MyPostsListProps) {
    return (
        <>
            <h1 className='myposts-title'>My Posts</h1>
            <div className="posts-grid">
                {posts.length === 0 ? (<p>No posts to display</p>) : posts.map(post => (
                    <MyPostsPreview
                        key={post._id}
                        post={post}
                        onEdit={() => onEdit(post)}
                        onDelete={() => onDelete(post._id!)}
                    />
                ))}
            </div>
        </>
    );
}

export default MyPostsList;
