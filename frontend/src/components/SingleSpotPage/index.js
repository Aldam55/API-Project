import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useHistory, useParams } from "react-router-dom"
import { getSpotById, removeSpot } from "../../store/spots"
import SpotReviewPage from "../SpotReviewPage"
import './SingleSpotPage.css'

const SingleSpotPage = ({ reviews }) => {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const spot = useSelector(state => state.spots.singleSpot)
    const user = useSelector(state => state.session.user)
    let existingReview
    const existingReviews = Object.values(reviews)

    if (!existingReviews.length) {
        existingReview = true
    } else {
        for (let i = 0; i < existingReviews.length; i++) {
            console.log('testing existing reviews', existingReviews[i])
            if (existingReviews[i].User?.id === user?.id) {
                existingReview = false
            } else {
                existingReview = true
            }
        }
    }
    useEffect(() => {
        dispatch(getSpotById(spotId))
    }, [dispatch, spotId, existingReviews.length])

    const handleRemove = () => {
        dispatch(removeSpot(spot.id))
        history.push('/')
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
                                    <div><img className='small-image' src={spot.SpotImages[1]?.url || 'https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png'} alt='Rocks'></img></div>
                                    <div><img className='small-image' src={spot.SpotImages[2]?.url || 'https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png'} alt='Rocks'></img></div>
                                </div>
                            </div>
                            <div className='single-spot-image-columns'>
                                <div className="image-columns">
                                    <div><img className='small-image top-right' src={spot.SpotImages[3]?.url || 'https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png'} alt='Rocks'></img></div>
                                    <div><img className='small-image bottom-right' src={spot.SpotImages[4]?.url || 'https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png'} alt='Rocks'></img></div>
                                </div>
                            </div>
                        </div>
                        <div className='single-spot-description'>
                            <div className='single-spot-information'>
                                <div className='single-spot-host'>Hosted By {spot.Owner?.firstName} {spot.Owner?.lastName}</div>
                                <div className="single-spot-description-text">{spot.description}</div>
                            </div>
                            <div className='single-spot-booking'>
                                <div className='single-spot-booking-info'>
                                    <div className='single-spot-booking-content'>
                                        <div className='booking-content-price'>
                                            <span id='booking-content-price'>${spot.price}</span>
                                            <span id='booking-content-night'>night</span>
                                        </div>
                                        <div className='booking-content-reviews'>
                                            <div id='booking-content-rating'>★{spot.avgStarRating === 0 ? 'New' : Number(spot.avgStarRating).toFixed(2)}</div>
                                            <div id='booking-content-numReviews'>• {spot.numReviews || 0} {numReviews}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='added-delete-button'>
                            <div className='reviews-big-info'>
                                <div className='reviews-avgRating reviews-text'>
                                    <span id='wtfman'>★</span>
                                    <span>{spot.avgStarRating === 0 ? 'New' : Number(spot.avgStarRating).toFixed(2)}</span>
                                </div>
                                <div className='reviews-numReviews reviews-text'>
                                    • {spot.numReviews || 0} {numReviews}
                                </div>
                                {(user && user.id !== spot.ownerId && existingReview) &&
                                    <NavLink to={`/spots/${spot.id}/reviews`} className='reviews-button'>Leave a Review</NavLink>
                                }
                                {/* {Object.values(reviews).map(review => (
                                    (user && user.id !== spot.ownerId && review.userId !== user.id)) &&
                                    <NavLink to={`/spots/${spot.id}/reviews`} className='reviews-button'>Leave a Review</NavLink>
                                )} */}
                            </div>
                            {(user && user.id === spot.ownerId) && (
                                <NavLink className='single-spot-edit' to={`/spots/${spot.id}/edit`}>Edit spot</NavLink>)}
                            {(user && user.id === spot.ownerId) && (
                                <button className='single-spot-delete' onClick={handleRemove}>
                                    Delete spot</button>
                            )}
                        </div>
                        <div className="reviews">
                            <SpotReviewPage></SpotReviewPage>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
            }
        </>
    )
}

export default SingleSpotPage
