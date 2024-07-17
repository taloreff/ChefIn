import { Review } from "../types/Post"

export const utilService={
    calculateAvgRating
}

function calculateAvgRating(reviews: Review[]) {
    if (!reviews || reviews.length === 0) return "0.00"
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0)
    const avgRating = (totalRating / reviews.length).toFixed(1)
    return avgRating
  }