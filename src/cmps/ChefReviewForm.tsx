import React from 'react';

interface ChefReviewFormProps {
    handleReviewSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    newReview: { user: string; rating: number; comment: string };
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function ChefReviewForm({ handleReviewSubmit, newReview, handleInputChange }: ChefReviewFormProps) {
    return (
        <div className="review-form">
            <h2>Leave a Review</h2>
            <form onSubmit={handleReviewSubmit}>
                <input
                    type="text"
                    name="user"
                    value={newReview.user}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    required
                />
                <input
                    type="number"
                    name="rating"
                    value={newReview.rating}
                    onChange={handleInputChange}
                    min="1"
                    max="5"
                    placeholder="Rating (1-5)"
                    required
                />
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
