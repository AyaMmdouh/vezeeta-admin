import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useState, useEffect } from "react";
import { fs } from '../../FirebaseConfig';
import { doc, getDoc, updateDoc, collection, addDoc } from 'firebase/firestore'
import Form from 'react-bootstrap/Form'
import { Container, Button } from 'react-bootstrap';
import './CityUpdate.css'
import AddRegion from './AddRegion';
import { useDispatch, useSelector } from 'react-redux';
import setCity from '../../store/actions/city';
import getRegions from '../../store/actions/regions';
import City from './City';
export default function CityUpdate() {
    const params = useParams()
    const id = params.id;
    const [cityId, setCityId] = useState(id);
    const [city, setCityobj] = useState({});
    const dispatch = useDispatch()
    const res = useSelector(state => state.city.city);
    const regionsRes = useSelector(state => state.regions.regions);
    const [cityName, setCityName] = useState(city?.namear)
    console.log(res);
    useEffect(() => {
        getCity()
        console.log(id);
    }, [res]);

    const getCity = () => {
        if (cityId) {
            setCityobj(res);
            dispatch(getRegions(res.regions));
        }
    }
    const handleInputChange = (e) => {
        setCityName(e.target.value);
    }
    const updateCity = async (e) => {
        // e.preventDefault()
        console.log(regionsRes)
        await setCityobj({
            ...City,
            namear: cityName,
            regions: regionsRes
        })
        console.log(city);
        const cityDoSnapshot = doc(fs, "city", cityId);
        updateDoc(cityDoSnapshot, city).then(res => {
            console.log(res);
        });
    }
    const AddCity = async (e) => {
        await addDoc(collection(fs, 'city'), city);
        setCityobj({
            namear: ""
        });
    }
    return (
        <Container className='mx-5 mt-5 p-5'>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label className=' m-2 fw-bold fs-5 text-danger'>Name</Form.Label>
                    <Form.Control type="text" placeholder="name" value={cityName} name='namear' onChange={(e) => { handleInputChange(e) }} />
                </Form.Group>
                <AddRegion id={cityId} />
                {cityId && <Button type="button" className='mb-2' onClick={(e) => { updateCity(e) }}>Update</Button>}
                {!cityId && <Button type="button" className='mb-2' onClick={(e) => { AddCity(e) }}>Add</Button>}
            </Form>
        </Container>
    )
}