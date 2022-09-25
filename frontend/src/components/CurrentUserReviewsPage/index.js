import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrent, removeSpotReview } from "../../store/reviews"
import { NavLink } from "react-router-dom"
import './CurrentUserReviewsPage.css'

const CurrentUserReviewsPage = () => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const reviews = useSelector(state => state.reviews.user)
    console.log('reviews of current user', reviews)
    console.log('user in get current user reviews', user)

    useEffect(() => {
        dispatch(getCurrent())
    }, [dispatch])


    if (!reviews || !Object.values(reviews).length) {
        return (
            <h2 className="your-spots-header">Looks like you don't have any Reviews!</h2>
        )
    }

    return (
        <div>
            {reviews &&
                <div className='current-user-page-wrapper'>
                    <h2 className="current-user-header">{user.firstName}'s Reviews!</h2>
                    <div className='reviews-page-wrapper'>
                        {Object.values(reviews).map(review => (
                            <div key={review.id} className="reviews-each-container">
                                <div key={review.id} className='reviews-each current-review'>
                                    <NavLink className='review-page-name review-to-spot' to={`/spots/${review.Spot.id}`}>{review.Spot?.name}</NavLink>
                                    <div className='review-page-date'>{new Date(review.updatedAt).toString().slice(4, 15)}</div>
                                    <div className='review-page-description'>{review.review}</div>
                                    {(user && user.id === review.userId) && (
                                        <button className='review-delete' onClick={() => dispatch(removeSpotReview(review.id))}>
                                            Delete Review</button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}

export default CurrentUserReviewsPage
