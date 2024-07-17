import React from 'react';
import { Post } from '../types/Post';

interface MyPostsPreviewProps {
    post: Post;
}

const MyPostsPreview: React.FC<MyPostsPreviewProps> = ({ post }) => {
    return (
        <div className="post-card">
            <img src={post.image} alt={post.title} className="post-image" />
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <p>{post.overview}</p>
            <p>Labels: {post.labels.join(', ')}</p>
            <p>Reviews:</p>
            <ul>
                {post.reviews.map((review, index) => (
                    <li key={index}>
                        <strong>{review.user}:</strong> {review.comment} ({review.rating} stars)
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyPostsPreview;
