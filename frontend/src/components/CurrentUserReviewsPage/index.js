import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrent } from "../../store/reviews"

const CurrentUserReviewsPage = () => {
    const dispatch = useDispatch()

    const reviews = useSelector(state => state.reviews.user)
    console.log('reviews of current user', reviews)

    useEffect(() => {
        dispatch(getCurrent())
    }, [dispatch])

    if (!reviews) return null

    return (
        <div>
            <div>current user test</div>
            <div>
                {Object.values(reviews).map(review => {
                    return <div key={review.id}>spot: {review.spotId}, review: {review.review}, rating:{review.stars}</div>
                })}
            </div>
        </div>
    )
}

export default CurrentUserReviewsPage
