import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getSpotReview } from "../../store/reviews"
import './SpotReviewPage.css'

const SpotReviewPage = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()

    const spotReviews = useSelector(state => state.reviews.spot)
    // console.log('all reviews for this spot', {...spotReviews})

    useEffect(() => {
        dispatch(getSpotReview(spotId))
    }, [dispatch, spotId])

    return (
        <div>
            {spotReviews &&
            <div className='reviews-page-wrapper'>
                {Object.values(spotReviews).map(review => (
                    <div key={review.id} className='reviews-each'>
                        <div className='review-page-name'>{review.User.firstName}</div>
                        <div className='review-page-date'>{new Date(review.updatedAt).toString().slice(4, 15)}</div>
                        <div className='review-page-description'>{review.review}</div>
                    </div>
                ))}
            </div>
            }
        </div>
    )
}

export default SpotReviewPage
