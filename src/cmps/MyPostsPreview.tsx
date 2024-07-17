import React, { useState } from 'react';
import { Post } from '../types/Post';
import { utilService } from '../services/util.service';
import EditPostModal from './EditPostModal';

interface MyPostsPreviewProps {
    post: Post;
}

function MyPostsPreview({ post }: MyPostsPreviewProps) {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    return (
        <>
            <div className="post-card" onClick={handleEditClick}>
                <img src={post.image} alt={post.title} className="post-image" />
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <p>{post.overview}</p>
                <p>Labels: {post.labels.join(', ')}</p>
                <p>Reviews: {utilService.calculateAvgRating(post.reviews)}</p>
            </div>
            {isEditing && <EditPostModal post={post} onClose={() => setIsEditing(false)} />}
        </>
    );
}

export default MyPostsPreview;
