import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { addASpot } from "../../store/spots"

const AddSpotFormPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    // const [lat, setLat] = useState('')
    // const [lng, setLng] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')

    const updateAddress = (e) => setAddress(e.target.value)
    const updateCity = (e) => setCity(e.target.value)
    const updateState = (e) => setState(e.target.value)
    const updateCountry = (e) => setCountry(e.target.value)
    const updateName = (e) => setName(e.target.value)
    const updateDescription = (e) => setDescription(e.target.value)
    const updatePrice = (e) => setPrice(e.target.value)

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
            lat: 38.5816,
            lng: 121.4944
        }

        let createdSpot = await dispatch(addASpot(payload))

        if (createdSpot) {
            history.push(`/spots/${createdSpot.id}`)
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
                    <option>United States of America</option>
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
                <input
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
                <button type='submit'>Create your spot</button>
                <button type='button' onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )

}

export default AddSpotFormPage
