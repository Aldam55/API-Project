import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useHistory, useParams } from "react-router-dom"
import { getSpotById, removeSpot } from "../../store/spots"
import AddReviewFormPage from "../AddReviewFormPage"
import SpotReviewPage from "../SpotReviewPage"
import './SingleSpotPage.css'

const SingleSpotPage = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const spot = useSelector(state => state.spots.singleSpot)
    const user = useSelector(state => state.session.user)
    // const reviews = useSelector(state => state.session.reviews)
    // ADD A REDIRECT FOR AFTER DELETING A SPOT
    // console.log('reviews in single spot page', reviews)
    // console.log('spotImages in single spot page', spot.SpotImages)
    // console.log('spot in singleSpotPage', spot)
    // console.log('Spot owner', spot.Owner)
    useEffect(() => {
        dispatch(getSpotById(spotId))
    }, [dispatch, spotId])

    const handleRemove = () => {
        dispatch(removeSpot(spot.id))
        history.push('/spots/current')
    }
    let numReviews = spot.numReviews === 1 ? "Review" : "Reviews"
    // if (!spot) return null
    // console.log('rerender test in SingleSpotPage')
    // if (!spot.SpotImages) spot.SpotImages[0] = 'https://imgur.com/a/77bQHGw' 'https://www.nps.gov/articles/images/image1_3.jpeg?maxwidth=1200&autorotate=false'
    return (
        <>
            {spot.id &&
                <div className="single-spot-spotwrapper">
                    <div className="single-spot-card">
                        <div className="single-spot-title">
                            <div className='single-spot-name'>
                                {spot.name}
                            </div>
                            <div className='single-spot-header'>
                                <div id='single-spot-rating'>
                                    ★{spot.avgStarRating === 0 ? 'New' : spot.avgStarRating}
                                </div>
                                <div id='single-spot-numreviews'>
                                    • {spot.numReviews || 0} {numReviews}
                                </div>
                                <div id='single-spot-location'>
                                    • {spot.city}, {spot.state}, {spot.country}
                                </div>
                            </div>
                        </div>
                        <div className="single-spot-images">
                            <div id='single-spot-big-image'>
                                <img id='spotimg2' src={spot.SpotImages[0]?.url || 'https://i.imgur.com/LophMn3.png'} alt='Rocks'></img>
                            </div>
                            <div className='single-spot-image-columns'>
                                <div className="image-columns">
                                    <div><img className='small-image' src={spot.SpotImages[1]?.url || 'https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png'}></img></div>
                                    <div><img className='small-image' src={spot.SpotImages[2]?.url || 'https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png'}></img></div>
                                </div>
                            </div>
                            <div class='single-spot-image-columns'>
                                <div className="image-columns">
                                    <div><img className='small-image top-right' src={spot.SpotImages[3]?.url || 'https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png'}></img></div>
                                    <div><img className='small-image bottom-right' src={spot.SpotImages[4]?.url || 'https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png'}></img></div>
                                </div>
                            </div>
                        </div>
                        <div className='single-spot-description'>
                            <div className='single-spot-information'>
                                <div className='single-spot-host'>Hosted By {spot.Owner.firstName} {spot.Owner.lastName}</div>
                                <div className="single-spot-description-text"></div>
                            </div>
                            <div className='single-spot-booking'>
                                <div className='single-spot-booking-info'>
                                    <div className='single-spot-booking-content'>
                                        <div className='booking-content-price'>${spot.price} night</div>
                                        <div className='booking-content-reviews'>
                                            <div id='booking-content-rating'>★{spot.avgStarRating === 0 ? 'New' : spot.avgStarRating}</div>
                                            <div id='booking-content-numReviews'>{spot.numReviews || 0} Reviews</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='reviews-big-info'>
                            <div className='reviews-avgRating'>
                                ★{spot.avgStarRating === 0 ? 'New' : spot.avgStarRating}</div>
                            <div className='reviews-numReviews'>{spot.numReviews || 0} Reviews</div>
                            {(user && user.id !== spot.ownerId) &&
                                <button className='reviews-button'>Add a review</button>}
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
                    {/* <div>
                        {(user && user.id !== spot.ownerId) && (
                            <AddReviewFormPage></AddReviewFormPage>)}
                    </div> */}
                    {(user && user.id === spot.ownerId) && (
                        <NavLink to={`/spots/${spot.id}/edit`}>Edit</NavLink>)}
                </div>
            }
        </>
    )
}

export default SingleSpotPage
