import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { addASpot, addImageToSpot, getSpotById } from "../../store/spots"
import './AddSpotFormPage.css'

const AddSpotFormPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    // const user = useSelector(state => state.session.user)

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [validationErrors, setValidationErrors] = useState([])
    const [showErrors, setShowErrors] = useState(false)

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
        if (!name || name.length > 50) errors.push('Must provide a valid name')
        if (!address || address.length > 20) errors.push('Must provide a valid address')
        if (!city || city.length > 20) errors.push('Must provide a valid city')
        if (!state || state.length > 20) errors.push('Must provide a valid state')
        if (!country) errors.push('Must provide a valid country')
        if (!price || isNaN(price)) errors.push('Price must be a number')
        if (!imgUrl.match(/\.(jpg|jpeg|png|gif)$/)) errors.push('Please enter a valid image(jpg/jpeg/png).')
        if (!description) errors.push('Must provide a description')
        if (description.length > 200 || description.length < 10) errors.push('Description must be between 10 and 200 characters')
        setValidationErrors(errors)
    }, [address, city, state, country, name, description, price, imgUrl])


    const handleSubmit = async (e) => {
        e.preventDefault()
        setShowErrors(true)

        if (!validationErrors.length) {
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
                setShowErrors(false)
                history.push(`/spots/${createdSpot.id}`)
            }
        }
    }

    const handleCancel = async (e) => {
        e.preventDefault()
        history.push('/')
    }

    return (
        <div className="add-spot-form-wrapper">
            <div id="add-spot-form">
                <form className='add-spot-form' onSubmit={handleSubmit}>
                    <h2 id='add-spot-header-text'>Host a New Spot</h2>
                    {showErrors &&
                        <ul className="errors">
                            {validationErrors.map((e, i) => {
                                return <li key={i}>{e}</li>
                            })}
                        </ul>
                    }
                    <div className='add-spot-form-content'>
                        <div className='add-form-input'>
                            <input
                                id='add-spot-top-border'
                                className='add-input'
                                type='text'
                                placeholder='Spot Name'
                                value={name}
                                onChange={updateName}
                                required />
                        </div>
                        <div className='add-form-input'>
                            <input
                                className='add-input'
                                type='text'
                                placeholder='Address'
                                value={address}
                                onChange={updateAddress}
                                required />
                        </div>
                        <div className='add-form-input'>
                            <input
                                className='add-input'
                                type='text'
                                placeholder='City'
                                value={city}
                                onChange={updateCity}
                                required />
                        </div>
                        <div className='add-form-input'>
                            <input
                                className='add-input'
                                type='text'
                                placeholder='State'
                                value={state}
                                onChange={updateState}
                                required />
                        </div>
                        <div className='add-form-input'>
                            <input
                                className='add-input'
                                placeholder="Country"
                                value={country}
                                onChange={updateCountry}
                                required >
                            </input>
                        </div>
                        <div className='add-form-input'>
                            <input
                                className='add-input'
                                type='number'
                                placeholder='Price'
                                value={price}
                                onChange={updatePrice}
                                required />
                        </div>
                        <div className='add-form-input'>
                            <input
                                className='add-input'
                                type='text'
                                placeholder='Image URL'
                                value={imgUrl}
                                onChange={updateImgUrl}
                                required />
                        </div>
                        <div className='add-form-input form-text-area'>
                            <textarea
                                id='add-spot-bottom-border'
                                className='add-input'
                                type='text'
                                placeholder='Description'
                                value={description}
                                onChange={updateDescription}
                                required />
                        </div>
                    </div>
                    <button type='submit'
                        className="add-form-button"
                    // onClick={() => setSubmitted(true)}
                    // disabled={validationErrors.length > 0 ? true : false}
                    >
                        Create your spot
                    </button>
                    <button type='button'
                        className="add-form-button form-cancel"
                        onClick={handleCancel}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    )

}

export default AddSpotFormPage
