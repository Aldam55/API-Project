import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrent } from "../../store/spots"
import { NavLink } from "react-router-dom"
import './CurrentUserSpotsPage.css'

const CurrentUserSpotsPage = () => {
    const dispatch = useDispatch()

    const spots = useSelector(state => state.spots.allSpots)
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getCurrent())
    }, [dispatch])

    if (!spots || !Object.values(spots).length) {
        return (
            <h2 className='your-spots-header'>Looks like you don't have any spots!</h2>
        )
    }

    return (
        <div>
            <h2 className='your-spots-header'>{user.firstName}'s Spots</h2>
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
        </div>
    )
}

export default CurrentUserSpotsPage
