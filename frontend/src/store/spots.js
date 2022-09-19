
const LOAD = 'spots/LOAD'
const LOAD_ONE = 'spots/LOAD_ONE'
const ADD = '/spots/ADD'

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


export const getAllSpots = () => async dispatch => {
    const response = await fetch('/api/spots')

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

export const getSpotReview = (spotId) => async dispatch => {
    const response = await fetch('/api/spots/:spotId/reviews')

    if (response.ok){
        const spotReview = await response.json()
        dispatch(loadOne(spotReview))
    }
}

export const addASpot = (data) => async dispatch => {
    const response = await fetch ('/api/spots')
}

const initialState = {
    allSpots: {},
    singleSpot: {}
}

const spotsReducer = (state = initialState, action) => {
    // const newState = { ...state, allSpots: {} }
    switch (action.type) {
        case LOAD:
            const allSpots = {}
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
            return { ...state, allSpots }
        case LOAD_ONE:
            let singleSpot = {}
            singleSpot = {...action.spotDetails}
            return {
                ...state,
                singleSpot
            }
        default:
            return state
    }
}

export default spotsReducer
