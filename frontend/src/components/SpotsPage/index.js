import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllSpots } from "../../store/spots"
import AddSpotFormPage from "../AddSpotFormPage"
import './SpotsPage.css'



const SpotsPage = () => {
    const dispatch = useDispatch()

    const spots = useSelector(state => state.spots.allSpots)
    // console.log('spots from useSelect in SpotsPage', spots)

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    // console.log(spots)
    if (!spots) return null

    return (
        <div className='blah'>
            <div>
                {Object.values(spots).map(spot =>(
                    <div key={spot.id}>name: {spot.name}, price: {spot.price}, rating {spot.avgRating}
                    <img src={spot.previewImage} alt='Rocks'></img>
                    </div>
                ))}
            </div>
            <div>
                <AddSpotFormPage></AddSpotFormPage>
            </div>
        </div>
    )
}

export default SpotsPage
