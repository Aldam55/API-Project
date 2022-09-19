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

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='123 App Academy Way'
                    value={address}
                    onChange={updateAddress}
                    required />
                <input
                    type='text'
                    placeholder='Bikini Bottom'
                    value={city}
                    onChange={updateCity}
                    required />
                    <input
                    type='text'
                    placeholder='State of Depression'
                    value={state}
                    onChange={updateState}
                    required />
                    <input
                    type='text'
                    placeholder='United States of America'
                    value={country}
                    onChange={updateCountry}
                    required />
                    <input
                    type='text'
                    placeholder={'Patrick\'s Rock'}
                    value={name}
                    onChange={updateName}
                    required />
                    <input
                    type='text'
                    placeholder='Ready to rock-n-roll?'
                    value={description}
                    onChange={updateDescription}
                    required />
                    <input
                    type='number'
                    placeholder='420'
                    value={price}
                    onChange={updatePrice}
                    required />
            </form>
        </div>
    )

}

export default AddSpotFormPage
