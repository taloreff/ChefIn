import React, { useState } from 'react';

interface ChefReviewFormProps {
    handleReviewSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    newReview: { rating: number; comment: string };
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleRatingChange: (rating: number) => void;
    userName: string;
}

export function ChefReviewForm({ handleReviewSubmit, newReview, handleInputChange, handleRatingChange }: ChefReviewFormProps) {
    const [hoveredRating, setHoveredRating] = useState<number | null>(null);

    return (
        <div className="review-form">
            <h2>Leave a Review</h2>
            <form onSubmit={handleReviewSubmit}>
                <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={`star ${star <= (hoveredRating || newReview.rating) ? 'filled' : 'hollow'}`}
                            onClick={() => handleRatingChange(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(null)}
                        >
                            ★
                        </span>
                    ))}
                </div>
                <textarea
                    name="comment"
                    value={newReview.comment}
                    onChange={handleInputChange}
                    placeholder="Your Review"
                    required
                />
                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
}
