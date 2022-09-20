import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { updateSpot, getSpotById } from "../../store/spots"

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
    const [lat, setLat] = useState(spot.lat)
    const [lng, setLng] = useState(spot.lng)
    const [name, setName] = useState(spot.name)
    const [description, setDescription] = useState(spot.description)
    const [price, setPrice] = useState(spot.price)
    // const [img, setImg] = useState(spot.img)
    // const [address, setAddress] = useState('')
    // const [city, setCity] = useState('')
    // const [state, setState] = useState('')
    // const [country, setCountry] = useState()
    // const [lat, setLat] = useState()
    // const [lng, setLng] = useState()
    // const [name, setName] = useState()
    // const [description, setDescription] = useState()
    // const [price, setPrice] = useState()

    const updateAddress = (e) => setAddress(e.target.value)
    const updateCity = (e) => setCity(e.target.value)
    const updateState = (e) => setState(e.target.value)
    const updateCountry = (e) => setCountry(e.target.value)
    const updateName = (e) => setName(e.target.value)
    const updateDescription = (e) => setDescription(e.target.value)
    const updatePrice = (e) => setPrice(e.target.value)
    const updateLat = (e) => setLat(e.target.value)
    const updateLng = (e) => setLng(e.target.value)



    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            address,
            city,
            state,
            country,
            name,
            description,
            price,
            lat,
            lng
        }

        let updatedSpot = await dispatch(updateSpot(payload, spot.id))

        if (updatedSpot) {
            history.push(`/spots/${updatedSpot.id}`)
        }
    }

    const handleCancel = async (e) => {
        e.preventDefault()
        history.push('/')
    }

    return (
        <div>
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
                    type='number'
                    placeholder='Latitude'
                    value={lat}
                    onChange={updateLat}
                    required />
                <input
                    type='number'
                    placeholder='Longitude'
                    value={lng}
                    onChange={updateLng}
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
                <input
                    type='text'
                    placeholder='Price'
                    value={price}
                    onChange={updatePrice}
                    required />
                <button type='submit'>Update</button>
                <button type='button' onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )

}

export default UpdateSpotFormPage
