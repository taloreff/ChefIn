import React from 'react';
import { Post } from '../types/Post';
import { utilService } from '../services/util.service';
import { postService } from '../services/post.service';

interface MyPostsPreviewProps {
    post: Post;
    onEdit: () => void;
    onDelete: () => void;
}

function MyPostsPreview({ post, onEdit, onDelete }: MyPostsPreviewProps) {
    return (
        <div className="post-card">
            <img src={postService.getImageUrl(post.image)} alt={post.title} className="mypost-image" />
            <div className="post-content">
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <p>{post.overview}</p>
                <div className="post-labels">
                    {post.labels.map((label, index) => (
                        <span key={index} className="post-label">{label}</span>
                    ))}
                </div>
                <p className="post-reviews">Reviews: {utilService.calculateAvgRating(post.reviews)}</p>
                <div className="post-actions">
                    <button onClick={onDelete} className="delete-button">Delete</button>
                    <button onClick={onEdit} className="edit-button">Edit</button>
                </div>
            </div>
        </div>
    );
}

export default MyPostsPreview;
