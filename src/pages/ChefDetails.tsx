import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { postService } from '../services/post.service';
import { Post, Review } from '../types/Post';
import { MapContainer } from '../cmps/MapContainer';
import { ChefIncluded } from '../cmps/ChefIncluded';
import { ChefRating } from '../cmps/ChefRating';
import { ChefReviews } from '../cmps/ChefReviews';
import { ChefReviewForm } from '../cmps/ChefReviewForm';
import { useSelector } from 'react-redux';
import { AppState } from '../types/AppState';
import { userService } from '../services/user.service';

export function ChefDetails() {
    const { postId } = useParams<{ postId: string }>();
    const loggedinUser = useSelector((state: AppState) => state.userModule.user);
    const [post, setPost] = useState<Post | null>(null);
    const [newReview, setNewReview] = useState<Review>({ user: loggedinUser?.username || '', rating: 0, comment: '' });
    const [user, setUser] = useState<{ username: string, profileImgUrl: string } | null>(null);

    useEffect(() => {
        loadPost();
    }, [postId]);

    useEffect(() => {
        if (post) {
            loadUser(post.userId);
        }
    }, [post]);

    const loadUser = async (userId: string) => {
        try {
            const userData = await userService.getById(userId);
            setUser(userData);
        } catch (error) {
            console.error("Error fetching user data", error);
        }
    };

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

    async function handleReviewSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            if (postId) {
                const updatedPost = await postService.addReview(postId, newReview);
                setPost(updatedPost);
                setNewReview({ user: '', rating: 0, comment: '' });
            }
        } catch (err) {
            console.log('Failed to submit review', err);
        }
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setNewReview(prevReview => ({ ...prevReview, [name]: value }));
    }

    function handleRatingChange(rating: number) {
        setNewReview(prevReview => ({ ...prevReview, rating }));
    }

    if (!post || !user) {
        return <div>Loading...</div>;
    }

    return (
        <div className='details-container'>
            <section className='image-section'>
                <div className="chef-details">
                    <div className="hero-section" style={{ backgroundImage: `url(${user.profileImgUrl})` }}>
                        <div className="hero-content">
                            <h1>{post.title}</h1>
                            <p>{user.username}</p>
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
                </div >
            </section>
            <div className="overview">
                <h2>Overview</h2>
                <p>{post.overview}</p>
            </div>
            <div className="whats-included">
                <ChefIncluded items={post.whatsIncluded} />
            </div>
            <section className="rating-container">
                <ChefRating reviews={post.reviews} />
                <ChefReviews reviews={post.reviews} />
                <ChefReviewForm
                    handleInputChange={handleInputChange}
                    handleReviewSubmit={handleReviewSubmit}
                    handleRatingChange={handleRatingChange}
                    newReview={newReview}
                    userName={post.username}
                />
            </section>
            <div className="map">
                <h2>Meeting Point</h2>
                <MapContainer lat={post.meetingPoint.lat} lng={post.meetingPoint.lng} />
            </div>
        </div>
    );
}

export default ChefDetails;
