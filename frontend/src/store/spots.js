import { csrfFetch } from "./csrf"

const LOAD = 'spots/LOAD'
const LOAD_ONE = 'spots/LOAD_ONE'
const ADD = '/spots/ADD'
const ADD_IMAGE = '/spots/ADD_IMAGE'
const REMOVE = '/spots/REMOVE'
const UPDATE = '/spots/UPDATE'
const LOAD_CURRENT = 'spots/LOAD_CURRENT'
const RESET_STATE = '/spots/RESET_STATE'

const load = (spots) => ({
    type: LOAD,
    spots,
})

const loadOne = (spotDetails) => ({
    type: LOAD_ONE,
    spotDetails
})

const add = (spot) => ({
    type: ADD,
    spot
})

const remove = (spotId) => ({
    type: REMOVE,
    spotId
})

const update = (spot) => ({
    type: UPDATE,
    spot
})

const addImage = (spotId) => ({
    type: ADD_IMAGE,
    spotId
})

export const resetState = () => ({
    type: RESET_STATE
})

// const loadCurrent = (spot) => ({
//     type: LOAD_CURRENT,
//     spot
// })

export const removeSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(remove(spotId))
    }
}

export const getCurrent = () => async dispatch => {
    const response = await csrfFetch('/api/spots/current')

    if (response.ok) {
        const spot = await response.json()
        dispatch(load(spot))
        return spot
    }
}

export const getAllSpots = () => async dispatch => {
    const response = await fetch('/api/spots')
    // console.log('response from getAllSpots thunk', response)
    if (response.ok) {
        const spots = await response.json()
        // console.log('spots', spots)
        dispatch(load(spots))
    }
}

export const getSpotById = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}`);

    if (response.ok) {
        const singleSpot = await response.json()
        // console.log('single spot info', singleSpot)
        dispatch(loadOne(singleSpot))
    }
}

export const updateSpot = (data, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (response.ok) {
        const spot = await response.json()
        dispatch(update(spot))
        return spot
    }
}

export const addImageToSpot = (data, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    // console.log('response in addImage thunk', response)
    if (response.ok) {
        const image = await response.json()
        // console.log('image in addImage thunk', image)
        dispatch(addImage(image))
        return image
    }
}

export const addASpot = (data) => async dispatch => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    // console.log('response in addASpot thunk action', response)
    if (response.ok) {
        const spot = await response.json()
        dispatch(add(spot))
        return spot
    }
}

const initialState = {
    allSpots: {},
    singleSpot: {
        SpotImages: []
    }
}

const spotsReducer = (state = initialState, action) => {
    // const newState = { ...state, allSpots: {} }
    const allSpots = {};
    let singleSpot;
    let newState; // wet newState code in 4 cases. fix later
    switch (action.type) {
        case LOAD_CURRENT:
        case LOAD:
            // const obj = action.spots.Spot.reduce((acc, spot) => {
            //     acc[spot.id] = spot
            //     return acc
            // }, {})
            // console.log('reduce method', obj)
            // return {...state, allSpots: obj}
            action.spots.Spot.forEach(spot => {
                allSpots[spot.id] = spot
            })
            // console.log('newState.spots in spotsReducer', newState.spots)
            return { allSpots, singleSpot: { SpotImages: [] } }
        case LOAD_ONE: {
            const newState = { ...state, singleSpot: { ...state.singleSpot } };
            // console.log('action.spotDetails', action.spotDetails)
            newState.singleSpot = action.spotDetails;
            return newState;
            // {
            //     ...state,
            //     singleSpot
            // }
        }
        case UPDATE:
            // newState = {
            //     singleSpot: { ...state.singleSpot, SpotImages: [...state.singleSpot.SpotImages] }
            // }
            // newState.singleSpot = action.spot
            newState = { allSpots: { ...state.allSpots }, }
            newState.singleSpot = action.spot
            newState.singleSpot.SpotImages = [...state.singleSpot.SpotImages]
            return newState
        case ADD:
            newState = { allSpots: { ...state.allSpots }, }
            newState.singleSpot = action.spot
            newState.singleSpot.SpotImages = []

            return newState
        case ADD_IMAGE:
            newState = { singleSpot: { ...state.singleSpot } }
            // NOT ITERABLE if you spread state.singleSpot.SpotImages
            // console.log('action in addImage reducer', action)
            newState.singleSpot.SpotImages = [action.spotId.url]
            // newState.singleSpot.SpotImages[action.image.id] = action.image
            return newState
        case REMOVE:
            newState = {
                allSpots: { ...state.allSpots },
                singleSpot: { ...state.singleSpot }
            }
            delete newState.allSpots[action.spotId]
            if (newState.singleSpot.id === action.spotId) {
                newState.singleSpot = {}
            }
            return newState
        case RESET_STATE:
            return initialState
        default:
            return state
    }
}

export default spotsReducer
