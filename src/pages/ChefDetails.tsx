import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { postService } from '../services/post.service';
import { Post } from '../types/Post';
import { MapContainer } from '../cmps/MapContainer';

export function ChefDetails() {
    const { postId } = useParams<{ postId: string }>();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        loadPost();
    }, [postId]);

    async function loadPost() {
        try {
            if (postId) {
                const fetchedPost = await postService.getById(postId);
                setPost(fetchedPost);
            }
        } catch (err) {
            console.log('Failed to fetch chef details', err);
        }
    }

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="chef-details">
            <div className="hero-section" style={{ backgroundImage: `url(${post.profileImgUrl})` }}>
                <div className="hero-content">
                    <h1>{post.title}</h1>
                    <p>{post.username}</p>
                </div>
            </div>
            <div className="content-card">
                <div className="post-image-container">
                    <img src={post.image} alt={post.title} className="post-image" />
                    <div className="labels">
                        {post.labels.map((label, index) => (
                            <span key={index} className="label">{label}</span>
                        ))}
                    </div>
                </div>
                <p>{post.description}</p>
            </div>
            <div className="overview">
                <h2>Overview</h2>
                <p>{post.overview}</p>
            </div>
            <div className="whats-included">
                <h2>What's Included</h2>
                <ul>
                    {post.whatsIncluded.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
            <div className="reviews">
                <h2>Reviews</h2>
                {post.reviews.map((review, index) => (
                    <div key={index} className="review">
                        <p><strong>{review.user}</strong> - {review.rating} stars</p>
                        <p>{review.comment}</p>
                    </div>
                ))}
            </div>
            <div className="map">
                <h2>Meeting Point</h2>
                <MapContainer lat={post.meetingPoint.lat} lng={post.meetingPoint.lng} />
            </div>
        </div>
    );
}

export default ChefDetails;
