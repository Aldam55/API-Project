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
            {spots.id &&
            <div>
                {Object.values(spots).map(spot => (
                    <div key={spot.id}>name: {spot.name}, price: {spot.price}, rating {spot.avgRating}
                    <div>
                    <img src={spot.previewImage}></img>
                    </div>
                    </div>
                ))}
            </div>
            }
        </div>
    )
}

export default CurrentUserSpotsPage
