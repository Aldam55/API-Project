import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrent, removeSpotReview } from "../../store/reviews"

const CurrentUserReviewsPage = () => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const reviews = useSelector(state => state.reviews.user)
    console.log('reviews of current user', reviews)
    console.log('user in get current user reviews', user)

    useEffect(() => {
        dispatch(getCurrent())
    }, [dispatch])

    if (!reviews) return null
    if (!user) return null
    return (
        <div>
            <div>current user test</div>
            <div>
                {Object.values(reviews).map(review => {
                    return <div key={review.id}>spot: {review.spotId}, review: {review.review}, rating:{review.stars},
                        <button onClick={() => dispatch(removeSpotReview(review.id))}>Delete Review</button>
                    </div>
                })}
            </div>
        </div>
    )
}

export default CurrentUserReviewsPage
