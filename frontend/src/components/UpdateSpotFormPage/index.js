import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { updateSpot, addImageToSpot } from "../../store/spots"
import './UpdateSpotFormPage.css'

const UpdateSpotFormPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const spot = useSelector(state => state.spots.singleSpot)
    // console.log('spot in update spot form page', spot)

    const [address, setAddress] = useState(spot.address)
    const [city, setCity] = useState(spot.city)
    const [state, setState] = useState(spot.state)
    const [country, setCountry] = useState(spot.country)
    const [name, setName] = useState(spot.name)
    const [description, setDescription] = useState(spot.description)
    const [price, setPrice] = useState(spot.price)
    const [imgUrl, setImgUrl] = useState(spot.SpotImages[0])
    const [validationErrors, setValidationErrors] = useState([])

    const updateAddress = (e) => setAddress(e.target.value)
    const updateCity = (e) => setCity(e.target.value)
    const updateState = (e) => setState(e.target.value)
    const updateCountry = (e) => setCountry(e.target.value)
    const updateName = (e) => setName(e.target.value)
    const updateDescription = (e) => setDescription(e.target.value)
    const updatePrice = (e) => setPrice(e.target.value)
    const updateImgUrl = (e) => setImgUrl(e.target.value)

    useEffect(() => {
        const errors = []
        if (!address || address.length > 20) errors.push('Must provide a valid address')
        if (!city || city.length > 20) errors.push('Must provide a valid city')
        if (!state || state.length > 20) errors.push('Must provide a valid state')
        if (!name || name.length > 50) errors.push('Must provide a valid name')
        if (!description) errors.push('Must provide a description')
        if (!price || isNaN(price)) errors.push('Price must be a number')
        setValidationErrors(errors)
    }, [address, city, state, country, name, description, price])


    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            address,
            city,
            state,
            country,
            name,
            description,
            lat: 39.423,
            lng: 39.423,
            price,
        }

        let updatedSpot = await dispatch(updateSpot(payload, spot.id))
        // console.log('does update break here?', updatedSpot)

        if (updatedSpot) {

        //     const imgBody = ({
        //         spotId: updatedSpot.id,
        //         url: imgUrl,
        //         preview: true
        //     })

        //     await dispatch(addImageToSpot(imgBody, updatedSpot.id))
            history.push(`/spots/${updatedSpot.id}`)
        }
    }

    const handleCancel = async (e) => {
        e.preventDefault()
        history.push('/')
    }

    return (
        <div className="formwrapper">
            <form onSubmit={handleSubmit}>
                <select
                    value={country}
                    onChange={updateCountry}
                    required >
                    <option>USA</option>
                    <option>China</option>
                    <option>Japan</option>
                    <option>Mexico</option>
                    <option>Canada</option>
                </select>
                <input
                    type='text'
                    placeholder='Address'
                    value={address}
                    onChange={updateAddress}
                    required />
                <input
                    type='text'
                    placeholder='City'
                    value={city}
                    onChange={updateCity}
                    required />
                <input
                    type='text'
                    placeholder='State'
                    value={state}
                    onChange={updateState}
                    required />
                <input
                    type='text'
                    placeholder='Name'
                    value={name}
                    onChange={updateName}
                    required />
                <textarea
                    type='text'
                    placeholder='Description'
                    value={description}
                    onChange={updateDescription}
                    required />
                <input
                    type='number'
                    placeholder='Price'
                    value={price}
                    onChange={updatePrice}
                    required />
                {/* <input
                    type='text'
                    placeholder='Image URL'
                    value={imgUrl}
                    onChange={updateImgUrl} /> */}
                <button type='submit'>Update</button>
                <button type='button' onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )

}

export default UpdateSpotFormPage
