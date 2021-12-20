import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useState, useEffect, useReducer } from "react";
import { fs } from '../../FirebaseConfig';
import { doc, getDoc, updateDoc, collection, addDoc } from 'firebase/firestore'
import Form from 'react-bootstrap/Form'
import { Container, Button } from 'react-bootstrap';
export default function DoctorsUpdate() {
    const params = useParams()
    const history = useHistory();
    const id = params.id;
    const [doctorsId, setDoctorsId] = useState(id);
    const [doctors, setDoctors] = useState({})
    const [location, setLocation] = useState({
        region: doctors?.location?.region,
        city: doctors?.location?.city
    });
    const [clinicTime, setClinicTime] = useState({
        start: doctors?.clinicTime?.start,
        end: doctors?.clinicTime?.end
    })
    const [Category, setCategory] = useState({
        name: doctors?.category?.name,
        subCategory: doctors?.category?.subCategory
    });
    useEffect(() => {
        const getDoctors = async () => {
            if (id) {
                const doctorsDocs = await getDoc(doc(fs, "Doctors", id));
                setDoctors(doctorsDocs.data());
            }
        };

        getDoctors();
    }, []);
    const validatePhone = (number) => {
        let regExp = /^01(0|1|2|5)[0-9]{8}$/
        let result = regExp.test(number);
        return result;
    }

    const handleInputChange = (e) => {
        switch (e.target.name) {
            case 'name':
                {
                    setDoctors({
                        ...doctors,
                        [e.target.name]: e.target.value
                    })
                    break;
                }
            case 'city': {
                setDoctors({
                    ...doctors,
                    location: {
                        ...location,
                        city: e.target.value
                    }
                })
                setLocation({
                    ...location,
                    city: e.target.value
                })
                break;
            }
            case 'region': {
                setDoctors({
                    ...doctors,
                    location: {
                        ...location,
                        region: e.target.value
                    }
                })
                setLocation({
                    ...location,
                    region: e.target.value
                })
                break;
            }
            case 'start': {
                setClinicTime({
                    ...clinicTime,
                    start: parseInt(e.target.value)
                })
                setDoctors({
                    ...doctors,
                    clinicTime: {
                        ...clinicTime,
                        start: parseInt(e.target.value)
                    }
                })
                break;
            }
            case 'end': {
                setClinicTime({
                    ...clinicTime,
                    end: parseInt(e.target.value)
                })
                setDoctors({
                    ...doctors,
                    clinicTime: {
                        ...clinicTime,
                        end: parseInt(e.target.value)
                    }

                })

                break;
            }
            case 'CategoryName': {
                setCategory({
                    ...Category,
                    name: e.target.value
                })
                setDoctors({
                    ...doctors,
                    category: {
                        ...Category,
                        name: e.target.value
                    }
                })
                break;
            }
            case 'subCategory': {
                setCategory({
                    ...Category,
                    subCategory: e.target.value
                })
                setDoctors({
                    ...doctors,
                    category: {
                        ...Category,
                        subCategory: e.target.value
                    }
                })
                break;
            }
            case 'phone': {
                let result = validatePhone(e.target.value);
                console.log(result);
                break;
            }
            default:
                return doctors;
        }
        console.log(doctors);
    }
    const updateDoctors = (e) => {
        console.log(doctors);
        const doctorsDocs = doc(fs, "Doctors", doctorsId);
        updateDoc(doctorsDocs, doctors);
        alert('Doc Updated Successfully ');
        history.push('/doctors');
    }
    const addDoctors = async (e) => {
        console.log(doctors);
        // const newFields = {}
        await addDoc(collection(fs, "Doctors"), doctors);
        setDoctors({
            name: "",
            category: "",
            mobile: "",
            Information: "",
            clinicTimeStart: "",
            clinicTimeEnd: "",
            degree: "",
            waiting: "",
            price: "",
            location: "",
            //////////////////////
            // name:newName ,
            // category:newCategory,
            // Mobile:newMobile,
            // information:newInformation,
            // clinicTimeStart:newClinicTimeStart,
            // clinicTimeEnd:newClinicTimeEnd,
            // degree:newDegree,
            // waiting:newWaiting,
            // price:newPrice,
            // location:newLocation,

        });
        alert('Doc Added Successfully ')
    }

    return (
        <>
            <Container className='mx-5 mt-5 p-5'>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        {/* <Form.Label className=' m-2 fw-bold fs-5 text-danger'>Name in arabic</Form.Label>
                        <Form.Control type="text" placeholder="name in arabic" value={doctors.name} name='namear' onChange={(e) => { handleInputChange(e) }} />
                        <Form.Label className=' m-2 fw-bold fs-5 text-danger'>Name in english</Form.Label>
                        <Form.Control type="text" placeholder="name in english" value={doctors.name} name='nameen' onChange={(e) => { handleInputChange(e) }} /> */}
                        <Form.Label className=' m-2 fw-bold fs-5 text-danger'>Name</Form.Label>
                        <Form.Control type="text" placeholder="name" value={doctors?.name} name='name' onChange={(e) => { handleInputChange(e) }} />
                        <Form.Label className=' m-2 fw-bold fs-5 text-danger'>Mobile</Form.Label>
                        <Form.Control type="text" placeholder="mobile" value={doctors?.mobile} name='mobile' onChange={(e) => { handleInputChange(e) }} />
                        <Form.Label className=' m-2 fw-bold fs-5 text-danger'>Price</Form.Label>
                        <Form.Control type="text" placeholder="price" value={doctors?.price} name='price' onChange={(e) => { handleInputChange(e) }} />
                        <Form.Label className=' m-2 fw-bold fs-5 text-danger'>Waiting</Form.Label>
                        <Form.Control type="text" placeholder="waiting" value={doctors?.waiting} name='waiting' onChange={(e) => { handleInputChange(e) }} />
                        <Form.Label className=' m-2 fw-bold fs-5 text-danger'>City</Form.Label>
                        <Form.Control type="text" placeholder="city" value={doctors?.location?.city} name='city' onChange={(e) => { handleInputChange(e) }} />
                        <Form.Label className=' m-2 fw-bold fs-5 text-danger'>Region</Form.Label>
                        <Form.Control type="text" placeholder="region" value={doctors?.location?.region} name='region' onChange={(e) => { handleInputChange(e) }} />
                        <Form.Label className=' m-2 fw-bold fs-5 text-danger'>ClinicTimeStart</Form.Label>
                        <Form.Control type="number" placeholder="start" value={doctors?.clinicTime?.start} name='start' onChange={(e) => { handleInputChange(e) }} />
                        <Form.Label className=' m-2 fw-bold fs-5 text-danger'>ClinicTimeEnd</Form.Label>
                        <Form.Control type="number" placeholder="end" value={doctors?.clinicTime?.end} name='end' onChange={(e) => { handleInputChange(e) }} />
                        <Form.Label className=' m-2 fw-bold fs-5 text-danger'>CategoryName</Form.Label>
                        <Form.Control type="text" placeholder="categoryName" value={doctors?.category?.name} name='CategoryName' onChange={(e) => { handleInputChange(e) }} />
                        <Form.Label className=' m-2 fw-bold fs-5 text-danger'>sudCategory</Form.Label>
                        <Form.Control type="text" placeholder="subCategory" value={doctors?.category?.subCategory} name='subCategory' onChange={(e) => { handleInputChange(e) }} />
                        <Form.Label className=' m-2 fw-bold fs-5 text-danger'>Information</Form.Label>
                        <Form.Control type="text" placeholder="information" value={doctors?.information} name='information' onChange={(e) => { handleInputChange(e) }} />

                    </Form.Group>
                    {doctorsId && <Button type="button" className='mb-2 btn-dark' onClick={(e) => { updateDoctors(e) }}>Update</Button>}
                    {!doctorsId && <Button type="button" className='mb-2 btn-dark' onClick={(e) => { addDoctors(e) }}>Add</Button>}

                </Form>
            </Container>
        </>
    )
}