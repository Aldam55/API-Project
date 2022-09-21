import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { getSpotById, removeSpot } from "../../store/spots"
import AddReviewFormPage from "../AddReviewFormPage"
import SpotReviewPage from "../SpotReviewPage"
import UpdateSpotFormPage from "../UpdateSpotFormPage"

const SingleSpotPage = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const spot = useSelector(state => state.spots.singleSpot)
    const user = useSelector(state => state.session.user)
    // ADD A REDIRECT FOR AFTER DELETING A SPOT
    console.log('spot in single spot page', spot.SpotImages)
    useEffect(() => {
        dispatch(getSpotById(spotId))
    }, [dispatch, spotId])

    const handleRemove = () => {
        dispatch(removeSpot(spot.id))
        history.push('/spots/current')
    }

    if (!spot) return null
    // console.log('rerender test in SingleSpotPage')
    // if (!spot.SpotImages) spot.SpotImages[0] = 'https://imgur.com/a/77bQHGw'
    return (
        <div>
            <img src='https://www.nps.gov/articles/images/image1_3.jpeg?maxwidth=1200&autorotate=false' alt='Rocks'></img>
            <div>
                {spot.name}
                <div>
                    {spot.address}
                </div>
                <div>
                    {spot.city}
                </div>
                <div>
                    {spot.state}
                </div>
                <div>
                    {spot.country}
                </div>
                <div>
                    {spot.price}
                </div>
                {spot.description}
            </div>
            <div>
                {(user && user.id === spot.ownerId) && (
                    <button onClick={handleRemove}>
                        Delete spot</button>
                )}
            </div>
            <div>
                <SpotReviewPage></SpotReviewPage>
            </div>
            <div>
                <AddReviewFormPage></AddReviewFormPage>
            </div>
            {(user && user.id === spot.ownerId) && (
                <UpdateSpotFormPage></UpdateSpotFormPage>)}
        </div>
    )
}

export default SingleSpotPage
