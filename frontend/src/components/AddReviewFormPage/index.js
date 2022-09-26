import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { addSpotReview } from "../../store/reviews"
import './AddReviewFormPage.css'

const AddReviewFormPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state.session.user)
    const spot = useSelector(state => state.spots.singleSpot)
    // console.log('spot in addreviewformpage', spot)
    const [review, setReview] = useState('')
    const [stars, setStars] = useState('')
    const [validationErrors, setValidationErrors] = useState([])
    const [showErrors, setShowErrors] = useState(false)

    const updateReview = (e) => setReview(e.target.value)
    const updateStars = (e) => setStars(e.target.value)

    useEffect(() => {
        const errors = []
        if (review.length < 10 || review.length > 200) errors.push('Reviews must be between 10 and 200 characters')
        setValidationErrors(errors)
    }, [review, stars])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setShowErrors(true)

        if (!validationErrors.length) {

            const payload = {
                review,
                stars
            }

            let createdReview = await dispatch(addSpotReview(payload, spot.id))

            if (createdReview) {
                setShowErrors(false)
                history.push(`/spots/${spot.id}`)
            }
        }
    }
    const handleCancel = async (e) => {
        e.preventDefault()
        history.push(`/spots/${spot.id}`)
    }

    return (
        <>
            {user && (
                <div className='review-form-wrapper'>
                    <div className="review-form-container">
                        <div className="leave-a-review">Leave a Review!</div>
                        <div className='review-form-content'>
                            <form onSubmit={handleSubmit}>
                                <div className='review-form-input'>
                                    <div className='review-how-stay'>How was your stay?</div>
                                    {showErrors &&
                                        <ul className="reviews-errors">
                                            {validationErrors.map((e, i) => {
                                                return <div className='review-error-message' key={i}>{e}</ div>
                                            })}
                                        </ul>
                                    }
                                    <textarea
                                        id='review-description-box'
                                        type='text'
                                        placeholder='Description...'
                                        value={review}
                                        required
                                        onChange={updateReview} />
                                </div>
                                <div className="review-form-rating">
                                    <div className='review-how-star'>Stars</div>
                                    <input
                                        id='review-stars-input'
                                        type='number'
                                        min='1'
                                        max='5'
                                        placeholder="1-5 Stars"
                                        value={stars}
                                        required
                                        onChange={updateStars} />
                                </div>
                                <button className='leave-your-review'
                                    type='submit'>
                                    Submit
                                </button>
                                <button type='button'
                                    className="leave-your-review"
                                    onClick={handleCancel}>
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default AddReviewFormPage
