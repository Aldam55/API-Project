import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllSpots } from "../../store/spots"
import { NavLink } from 'react-router-dom';
import { reset } from "../../store/reviews";
import './SpotsPage.css'



const SpotsPage = () => {
    const dispatch = useDispatch()

    const spots = useSelector(state => state.spots.allSpots)
    // console.log('spots from useSelect in SpotsPage', spots)

    useEffect(() => {
        dispatch(getAllSpots())
        return () => dispatch(reset())
    }, [dispatch])

    console.log('all spots info in spotspage', spots)
    if (!spots) return null

    return (
        <div className='allspots'>
            {Object.values(spots).map(spot => (
                <NavLink key={spot.id} id="nopurpleplease" to={`/spots/${spot.id}`}>
                    <div className='singlespot'>
                        <div className='spotcard'>
                            <img id='spotimg' src={spot.previewImage || 'https://i.imgur.com/LophMn3.png'} alt='https://imgur.com/a/77bQHGw'></img>
                            <div className='name-rating'>
                                <div key={spot.id} className='spot-name'>{spot.name}</div>
                                <div className='rating'>★{spot.avgRating === null ? 'New' : Number(spot.avgRating).toFixed(2)}</div>
                            </div>
                            <div className="city">{spot.city}, {spot.state}</div>
                            <div className="country">{spot.country}</div>
                            <div className="price"><b>${spot.price}</b> night</div>
                        </div>
                    </div>
                </NavLink>
            ))}
        </div>
    )
}

export default SpotsPage
