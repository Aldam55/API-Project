import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { addSpotReview } from "../../store/reviews"

const AddReviewFormPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state.session.user)
    const spot = useSelector(state => state.reviews)

    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0)

    const updateReview = (e) => setReview(e.target.value)
    const updateStars = (e) => setStars(e.target.value)


    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            review,
            stars
        }

        let createdReview = await dispatch(addSpotReview(payload))

        if (createdReview) {
            history.push(`/spots/${spot.spotId}`)
        }
    }

    return (
        <div>
            {user && (
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='How was your stay?'
                        value={review}
                        onChange={updateReview} />
                    <input
                        type='number'
                        min='1'
                        max='5'
                        value={stars}
                        onChange={updateStars} />
                    {(review.length && stars) && (<button type='submit'>Submit</button>)}
                </form>
            )}
        </div>
    )
}

export default AddReviewFormPage
