import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getSpotReview } from "../../store/spots"
import './SpotReviewPage.css'

const SpotReviewPage = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()

    const spotReview = useSelector(state => state.spots.singleSpot)

    useEffect(() => {
        dispatch(getSpotReview(spotId))
    }, [dispatch, spotId])

    return (
        <div>
            spotReview placeholder
        </div>
    )
}

export default SpotReviewPage
