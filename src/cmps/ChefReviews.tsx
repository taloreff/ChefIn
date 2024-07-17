import StarReviewSvg from "../assets/svgs/StarReviewSvg"
import { Review } from "../types/Post"

interface ChefReviewsProps {
  reviews: Review[]
}

export function ChefReviews({ reviews }: ChefReviewsProps) {

  function generateStars(rating: Review["rating"]) {
    return Array.from({ length: 5 }, (_, index) => (
      <StarReviewSvg key={index} filled={index < rating} />
    ))
  }


  return (
    <div className="guest-reviews-container">
      {reviews.map((review) => (
        <article className="review" key={review._id}>
          <div className="mini-user">
            <div className="mini-user-details">
              <h3>{review.user}</h3>
            </div>
          </div>

          <div className="review-info">
            <div className="star-review">{generateStars(review.rating)}</div>
          </div>

          <div className="review-txt">{review.comment}</div>
        </article>
      ))}
    </div>
  )

}
