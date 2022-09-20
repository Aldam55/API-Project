import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrent } from "../../store/spots"

const CurrentUserSpotsPage = () => {
    const dispatch = useDispatch()

    const spots = useSelector(state => state.spots.allSpots)
    console.log('spots in getcurrentuser', spots)

    useEffect(() => {
        dispatch(getCurrent())
    }, [dispatch])

    if (!spots) return null

    return (
        <div>
            <div>
                {Object.values(spots).map(spot => {
                    return <div key={spot.id}>name: {spot.name}, price: {spot.price}, image {spot.previewImage}, rating {spot.avgRating}</div>
                })}
            </div>
        </div>
    )
}

export default CurrentUserSpotsPage
