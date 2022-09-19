import { csrfFetch } from "./csrf"

const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'
const ADD_REVIEW = 'reviews/ADD_REVIEW'

const load = (reviews, spotId) => ({
    type: LOAD_REVIEWS,
    reviews,
    spotId
})

const add = (review, spotId) => ({
    type: ADD_REVIEW,
    review,
    spotId
})

export const addSpotReview = (data, spotId) => async dispatch => {
    const spot = await fetch(`/api/spots/${spotId}`)
    const response = await csrfFetch(`/api/spots/${spot.id}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if(response.ok){
        const spotReview = await response.json()
        dispatch(add(spotReview))
    }
}

export const getSpotReview = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}/reviews`)

    if (response.ok) {
        const spotReview = await response.json()
        dispatch(load(spotReview, spotId))
    }
}

const initialState = {}

const reviewReducer = (state = initialState, action) => {
    const newReviews = {};
    switch (action.type) {
        case LOAD_REVIEWS:
            action.reviews.Reviews.forEach(review => {
                newReviews[review.id] = review
            })
            return {
                ...state,
                ...newReviews
            }
        case ADD_REVIEW:
            newReviews[action.review.id] = action.review
            return {
                ...state,
                ...newReviews
            }
        default:
            return state
    }
}

export default reviewReducer
