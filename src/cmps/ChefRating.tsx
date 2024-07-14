import StarReviewSvg from "../assets/svgs/StarSmallSvg"
import CleanlinessSvg from "../assets/svgs/rating/CleanlinessSvg"
import AccuracySvg from "../assets/svgs/rating/AccuracySvg"
import FoodSvg from "../assets/svgs/rating/FoodSvg"
import CommunicationSvg from "../assets/svgs/rating/CommunicationSvg"
import LocationSvg from "../assets/svgs/rating/LocationSvg"
import ValueSvg from "../assets/svgs/rating/ValueSvg"

export function ChefRating({ reviews }) {

  const ratingCategories = [
    { label: 'Cleanliness', value: 4.9, Icon: CleanlinessSvg },
    { label: 'Accuracy', value: 4.8, Icon: AccuracySvg },
    { label: 'Food', value: 4.9, Icon: FoodSvg },
    { label: 'Communication', value: 5.0, Icon: CommunicationSvg },
    { label: 'Location', value: 5.0, Icon: LocationSvg },
    { label: 'Value', value: 4.8, Icon: ValueSvg },
  ]

  function calculateAvgRating(reviews) {
    if (!reviews || reviews.length === 0) return "0.00"
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0)
    const avgRating = (totalRating / reviews.length).toFixed(1)
    return avgRating
  }

  return (
    <div className="rating-reviews">
      <div className="reviews-rate">
        <StarReviewSvg />
        {reviews.length !== 0 && (
          <>
            {calculateAvgRating(reviews) !== "0.00" &&
              calculateAvgRating(reviews) !== "0.0" && (
                <>
                  <div className="average-rating">
                    {calculateAvgRating(reviews)}
                  </div>
                  <div>·</div>
                </>
              )}
            {reviews.length} reviews
          </>
        )}
        {reviews.length === 0 && (
          <span className="no-reviews">No reviews yet</span>
        )}
      </div>

      <section className="rating">

        <div className="overall-rating">
          <span>Overall rating</span>
          <div className="progress">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div className="rating-progress" key={rating}>
                {rating}
                <progress max="5" value={rating === 5 ? 4.6 : rating === 4 ? 4.1 : 0}></progress>
              </div>
            ))}
          </div>
        </div>

        <div className="rating-detail">
          {ratingCategories.map(({ label, value, Icon }) => (
            <div className="rating-item" key={label}>
              <div className="rating-info">
                <span>{label}</span>
                <div>{value}</div>
              </div>
              <Icon />
            </div>
          ))}
        </div>
      </section>
    </div>
  )

}