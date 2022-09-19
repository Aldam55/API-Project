const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'

const load = (reviews, spotId) => ({
    type: LOAD_REVIEWS,
    reviews,
    spotId
})

export const getSpotReview = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}/reviews`)

    if (response.ok) {
        const spotReview = await response.json()
        dispatch(load(spotReview, spotId))
    }
}

const initialState = {}

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS:
            const newReviews = {};
            action.reviews.Reviews.forEach(review => {
                newReviews[review.id] = review
            })
            return {
                ...state,
                ...newReviews
            }
        default:
            return state
    }
}

export default reviewReducer
