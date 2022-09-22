import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { addASpot, addImageToSpot, getSpotById } from "../../store/spots"
import './AddSpotFormPage.css'

const AddSpotFormPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [imgUrl, setImgUrl] = useState('')
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
    }, [address, city, state, country, name, description, price, imgUrl])


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

        let createdSpot = await dispatch(addASpot(payload))


        if (createdSpot) {
            const imgBody = ({
                url: imgUrl,
                preview: true
            })
            await dispatch(addImageToSpot(imgBody, createdSpot.id))
            history.push(`/spots/${createdSpot.id}`)
        }
    }

    const handleCancel = async (e) => {
        e.preventDefault()
        history.push('/')
    }

    return (
        <div className="add-spot-form">
            <div id="add-spot-form">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>country</label>
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
                    </div>
                    <div>
                        <label>Address</label>
                        <input
                            type='text'
                            placeholder='Address'
                            value={address}
                            onChange={updateAddress}
                            required />
                    </div>
                    <div>
                        <label>City</label>
                        <input
                            type='text'
                            placeholder='City'
                            value={city}
                            onChange={updateCity}
                            required />
                    </div>
                    <div>
                    <label>State</label>
                    <input
                        type='text'
                        placeholder='State'
                        value={state}
                        onChange={updateState}
                        required />
                        </div>
                        <div>
                    <label>Name</label>
                        <input
                            type='text'
                            placeholder='Name'
                            value={name}
                            onChange={updateName}
                            required />
                            </div>
                            <div>
                    <label>Description</label>
                        <textarea
                            type='text'
                            placeholder='Description'
                            value={description}
                            onChange={updateDescription}
                            required />
                            </div>
                            <div>
                        <label>Price</label>
                        <input
                            type='number'
                            placeholder='Price'
                            value={price}
                            onChange={updatePrice}
                            required />
                            </div>
                            <div>
                    <label>ImageURL</label>
                        <input
                            type='text'
                            placeholder='Image URL'
                            value={imgUrl}
                            onChange={updateImgUrl} />
                            </div>
                    <button type='submit'
                        disabled={validationErrors.length > 0 ? true : false}>
                        Create your spot</button>
                    <button type='button' onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </div>
    )

}

export default AddSpotFormPage
