import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fs } from '../../FirebaseConfig';
import { doc, updateDoc, collection, addDoc } from 'firebase/firestore'
import AddRegion from './AddRegion';
import setCity from '../../store/actions/city';
import getRegions from '../../store/actions/regions';
import Form from 'react-bootstrap/Form'
import { Container, Button } from 'react-bootstrap';
import './CityUpdate.css'
export default function CityUpdate() {
    const params = useParams()
    const id = params.id;
    const [cityId, setCityId] = useState(id);
    const [city, setCityobj] = useState({});
    const res = useSelector(state => state.city.city);
    const regions = useSelector(state => state.regions.regions);
    const history = useHistory();
    const dispatch = useDispatch();
    let once = true;
    useEffect(() => {
        getCity()
    }, [res]);

    const getCity = () => {
        if (cityId) {
            setCityobj(res);
            if (once) {
                dispatch(getRegions(res.regions));
                once = false;
            }
        }
    }
    const handleInputChange = (e) => {
        setCity({
            ...city,
            namear: e.target.value
        })
    }
    const refreshPage = () => {
        window.location.reload();
    }
    const updateCity = async (e) => {
        // e.preventDefault()
        //  console.log(regions);
        let newCity = {
            namear: city.namear,
            nameen: city.nameen,
            regions: regions
        }
        const cityDoSnapshot = doc(fs, "city", cityId);
        updateDoc(cityDoSnapshot, newCity).then(res => {
            history.push('/city')
        })
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
                    <Form.Control type="text" placeholder="name" value={city?.namear} name='namear' onChange={(e) => { handleInputChange(e) }} />
                </Form.Group>
                <AddRegion id={cityId} regions={city?.regions} />
                {cityId && <Button type="button" className='mb-2' onClick={(e) => { updateCity(e) }}>Update</Button>}
                {!cityId && <Button type="button" className='mb-2' onClick={(e) => { AddCity(e) }}>Add</Button>}
            </Form>
        </Container>
    )
}