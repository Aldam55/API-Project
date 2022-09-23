import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useHistory, useParams } from "react-router-dom"
import { getSpotById, removeSpot } from "../../store/spots"
import AddReviewFormPage from "../AddReviewFormPage"
import LoginFormModal from "../LoginFormModal"
import SpotReviewPage from "../SpotReviewPage"
import './SingleSpotPage.css'

const SingleSpotPage = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const spot = useSelector(state => state.spots.singleSpot)
    const user = useSelector(state => state.session.user)
    const reviews = useSelector(state => state.session.reviews)
    // ADD A REDIRECT FOR AFTER DELETING A SPOT
    // console.log('reviews in single spot page', reviews)
    console.log('spotImages in single spot page', spot.SpotImages)
    console.log('spot in singleSpotPage', spot)
    console.log('Spot owner', spot.Owner)
    useEffect(() => {
        dispatch(getSpotById(spotId))
    }, [dispatch, spotId])

    const handleRemove = () => {
        dispatch(removeSpot(spot.id))
        history.push('/spots/current')
    }

    // if (!spot) return null
    // console.log('rerender test in SingleSpotPage')
    // if (!spot.SpotImages) spot.SpotImages[0] = 'https://imgur.com/a/77bQHGw' 'https://www.nps.gov/articles/images/image1_3.jpeg?maxwidth=1200&autorotate=false'
    return (
        <div>
            {spot.id &&
                <div className="spotwrapper">
                    <div className="singlespotcard">
                        <div className="title">
                            <div>
                                {spot.name}
                            </div>
                            <div>
                                {spot.avgStarRating}
                            </div>
                            <div>
                                {spot.numReviews || 0}
                            </div>
                            <div>
                                {spot.city}, {spot.state}, {spot.country}
                            </div>
                        </div>
                        <div>
                            <img id='spotimg2' src={spot.SpotImages[0]?.url || 'https://i.imgur.com/LophMn3.png'} alt='Rocks'></img>
                        </div>
                    </div>
                    <div>
                        {(user && user.id === spot.ownerId) && (
                            <button onClick={handleRemove}>
                                Delete spot</button>
                        )}
                    </div>
                    <div className="reviews">
                        <SpotReviewPage></SpotReviewPage>
                    </div>
                    <div>
                        {(user && user.id !== spot.ownerId) && (
                            <AddReviewFormPage></AddReviewFormPage>)}
                    </div>
                    {(user && user.id === spot.ownerId) && (
                        <NavLink to='/spots/:spotId/edit'>Edit</NavLink>)}
                </div>
            }
        </div>
    )
}

export default SingleSpotPage
