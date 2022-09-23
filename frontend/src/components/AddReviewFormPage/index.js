import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { addSpotReview } from "../../store/reviews"

const AddReviewFormPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state.session.user)
    const spot = useSelector(state => state.spots.singleSpot)
    // console.log('spot in addreviewformpage', spot)
    const [review, setReview] = useState('')
    const [stars, setStars] = useState('')
    const [validationErrors, setValidationErrors] = useState([])

    const updateReview = (e) => setReview(e.target.value)
    const updateStars = (e) => setStars(e.target.value)

    useEffect(() => {
        const errors = []
        if (!review) errors.push('Must provide a valid review')
        if (!stars) errors.push('Must provide a rating')
        setValidationErrors(errors)
    }, [review, stars])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            review,
            stars
        }

        let createdReview = await dispatch(addSpotReview(payload, spot.id))

        if (createdReview) {
            setReview('')
            setStars('')
            history.push(`/spots/${spot.spotId}`)
        }
    }

    return (
        <div>
            {user && (
                <div>
                    <form onSubmit={handleSubmit}>
                        <textarea
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
                        <button type='submit' hidden={(review.length && stars) ? false : true}>Submit</button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default AddReviewFormPage
