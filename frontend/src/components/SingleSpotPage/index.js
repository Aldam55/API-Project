import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getSpotById, removeSpot } from "../../store/spots"
import AddReviewFormPage from "../AddReviewFormPage"
import SpotReviewPage from "../SpotReviewPage"
import UpdateSpotFormPage from "../UpdateSpotFormPage"

const SingleSpotPage = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()

    const spot = useSelector(state => state.spots.singleSpot)
    const user = useSelector(state => state.session.user)
    // ADD A REDIRECT FOR AFTER DELETING A SPOT
    useEffect(() => {
        dispatch(getSpotById(spotId))
    }, [dispatch, spotId])

    if (!spot) return null
    // console.log('rerender test in SingleSpotPage')
    return (
        <div>
            <div>
                {spot.name}
            </div>
            <div>
                {(user && user.id === spot.ownerId) && (
                    <button onClick={() => dispatch(removeSpot(spot.id))}>
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
