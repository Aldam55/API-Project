import { csrfFetch } from "./csrf"

const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'
const ADD_REVIEW = 'reviews/ADD_REVIEW'
const REMOVE_REVIEW = '/reviews/REMOVE_REVIEW'
const CURRENT_REVIEWS = '/reviews/CURRENT_REVIEWS'

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

const remove = (reviewId) => ({
    type: REMOVE_REVIEW,
    reviewId
})

const current = (reviews) => ({
    type: CURRENT_REVIEWS,
    reviews
})

export const getCurrent = () => async dispatch => {
    const response = await csrfFetch('/api/reviews/current')

    if (response.ok) {
        const review = await response.json()
        dispatch(current(review))
        return review
    }
}

export const removeSpotReview = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(remove(reviewId))
    }
}

export const addSpotReview = (data, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (response.ok) {
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

const initialState = { spot: {}, user: {} }

const reviewReducer = (state = initialState, action) => {
    const spot = {};
    const user = {}
    switch (action.type) {
        case LOAD_REVIEWS:
            action.reviews.Reviews.forEach(review => {
                spot[review.id] = review
            })
            return {
                ...state,
                spot
            }
        case ADD_REVIEW:
            spot[action.review.id] = action.review
            return {
                ...state,
                spot
            }
        case CURRENT_REVIEWS:
            action.reviews.Reviews.forEach(review => {
                user[review.id] = review
            })
            return {
                ...state,
                user
            }
        default:
            return state
    }
}

export default reviewReducer
