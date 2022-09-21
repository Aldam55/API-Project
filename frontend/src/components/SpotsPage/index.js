import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllSpots } from "../../store/spots"
import { NavLink } from 'react-router-dom';
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
        <div className='allspots'>
            {Object.values(spots).map(spot => (
                <NavLink to={`/spots/${spot.id}`}>
                    <div class='singlespot'>
                        <div class='spotcard'>
                        <img id='spotimg' src={spot.previewImage || 'https://i.imgur.com/LophMn3.png'} alt='https://imgur.com/a/77bQHGw'></img>
                        <div key={spot.id} className='spot-name'>name: {spot.name}</div>
                        <div className="city">{spot.city}, {spot.state}</div>
                        <div className="country">{spot.country}</div>
                        <div className="price">${spot.price} night</div>
                        </div>
                    </div>
                </NavLink>
            ))}
        </div>
    )
}

export default SpotsPage
