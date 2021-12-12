import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useState, useEffect } from "react";
import { fs } from '../../FirebaseConfig';
import { doc, getDoc, updateDoc, collection, addDoc } from 'firebase/firestore'
import Form from 'react-bootstrap/Form'
import { Container, Button } from 'react-bootstrap';
import './CityUpdate.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
export default function CityUpdate() {
    const params = useParams()
    const id = params.id;
    const [cityId, setCityId] = useState(id);
    const [regions, setRegions] = useState([{}]);
    const [city, setCity] = useState({});
    const [newRegion, setNewRegion] = useState({});

    useEffect(() => {
        const getCity = async () => {
            if (id) {
                const cityDoSnapshot = await getDoc(doc(fs, "city", id));
                setCity(cityDoSnapshot.data());
                setRegions(city?.regions);
            }
        };

        getCity();
    }, [city]);

    const handleInputChange = (e) => {
        // console.log(city?.regions);
        setCity({
            ...city,
            [e.target.name]: e.target.value
        });
    }
    const updateCity = (e) => {
        // e.preventDefault()
        console.log(e)
        console.log(city);
        const cityDoSnapshot = doc(fs, "city", cityId);
        updateDoc(cityDoSnapshot, city).then(res=>{
            console.log(res);
        });
    }
    const AddCity = async (e) => {
        await addDoc(collection(fs, 'city'), city);
        setCity({
            namear: ""
        });
        console.log(city);
    }
    const handelRegionInput = (e) => {
        let regionAdded = {
            namear: e.target.value
        }
        setNewRegion(regionAdded);
        console.log(newRegion);

    }
    const addNew = async () => {
        let regionList = await city?.regions;
        regionList?.push(newRegion)
        setRegions({ regionList });
        console.log(regions);
        setCity({
            ...city,
            regions: regions
        });
        console.log(city);
    }
    return (
        <Container className='mx-5 mt-5'>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label className=' m-2 fw-bold fs-5 text-danger'>Name</Form.Label>
                    <Form.Control type="text" placeholder="name" value={city.namear} name='namear' onChange={(e) => { handleInputChange(e) }} />
                </Form.Group>
                <div className="taged-textbox form-group">
                    <label className="taged-textbox__lable m-2 fw-bold fs-5 text-danger" htmlFor="">Regions</label>
                    <div className="taged-textbox__data">
                        <div className="taged-textbox__tags">
                            {city?.regions?.map((region) => {
                                return (<div className="taged-textbox__tag" key={region.namear}><span>{region.namear}</span><a href="#" className="taged-textbox__remove"><i
                                    className="fas fa-times"><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></i></a>
                                </div>)
                            })}
                        </div>
                        <div className="taged-textbox__clear">
                            <a href="#"><i className="fas fa-times"></i></a>
                        </div>
                    </div>
                    <input className="taged-textbox__textbox form-control" type="text" name="region" id="" onChange={(e) => { handelRegionInput(e) }} />
                </div>
                <div className="add-product__actions mt-2">
                    <button className="btn btn-primary" type='button' onClick={() => { addNew() }}>Add</button>
                </div>
                {cityId && <Button type="button" className='mb-2' onClick={(e) => { updateCity(e) }}>Update</Button>}
                {!cityId && <Button type="button" className='mb-2' onClick={(e) => { AddCity(e) }}>Add</Button>}
            </Form>
        </Container>
    )
}