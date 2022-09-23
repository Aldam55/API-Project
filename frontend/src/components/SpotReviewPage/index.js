import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getSpotReview } from "../../store/reviews"
import './SpotReviewPage.css'

const SpotReviewPage = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()

    const spotReviews = useSelector(state => state.reviews.spot)
    console.log('all reviews for this spot', {...spotReviews})

    useEffect(() => {
        dispatch(getSpotReview(spotId))
    }, [dispatch, spotId])

    return (
        <div>
            {spotReviews &&
            <div>
                <div>spotReview placeholder</div>
                {Object.values(spotReviews).map(review => (
                    <div key={review.id}>
                        <div>user: {review.userId}</div>
                        <div>description: {review.review}</div>
                        <div>{review.stars}</div>
                    </div>
                ))}
            </div>
            }
        </div>
    )
}

export default SpotReviewPage
