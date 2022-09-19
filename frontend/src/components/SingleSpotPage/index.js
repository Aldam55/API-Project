import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getSpotById } from "../../store/spots"

const SingleSpotPage = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()

    const spot = useSelector(state => state.spots.singleSpot)
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getSpotById(spotId))
    }, [dispatch, spotId])

    if (!spot) return null

    return (
        <div>
            <div>
                {spot.name}
            </div>
        </div>
    )
}

export default SingleSpotPage
