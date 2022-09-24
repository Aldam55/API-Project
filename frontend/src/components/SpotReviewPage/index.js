import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { getSpotReview, removeSpotReview } from "../../store/reviews"
import './SpotReviewPage.css'

const SpotReviewPage = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state.session.user)
    const spotReviews = useSelector(state => state.reviews.spot)
    console.log('spotReivews', spotReviews)

    useEffect(() => {
        dispatch(getSpotReview(spotId))
    }, [dispatch, spotId])

    const handleRemove = () => {
        dispatch(removeSpotReview(spotReviews.id))
        history.push(`/spots/${spotReviews.id}`)
    }
    return (
        <div>
            {spotReviews &&
                <div className='reviews-page-wrapper'>
                    {Object.values(spotReviews).map(review => (
                        <div key={review.id} className='reviews-each'>
                            <div className='review-page-name'>{review.User?.firstName}</div>
                            <div className='review-page-date'>{new Date(review.updatedAt).toString().slice(4, 15)}</div>
                            <div className='review-page-description'>{review.review}</div>
                            {(user && user.id === review.userId) && (
                                <button className='review-delete' onClick={handleRemove}>
                                    Delete Review</button>
                            )}
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default SpotReviewPage
