import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useState, useEffect} from "react";
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
    const [location, setLocation] = useState({});
    const [clinicTime, setClinicTime] = useState({})
    const [Category, setCategory] = useState({});
    const [doctorError, setDoctorError] = useState({
        name: null,
        price: null,
        city: null,
        region: null,
        start: null,
        end: null,
        CategoryName: null,
        mobile: null,
        subCategory: null,
        information: null,
        waiting: null,
        degree: null,
        image: null
    })
    useEffect(() => {
        const getDoctors = async () => {
            if (id) {
                const doctorsDocs = await getDoc(doc(fs, "Doctors", id));
                setDoctors(doctorsDocs.data());
                setLocation({
                    region: doctors?.location?.region,
                    city: doctors?.location?.city
                })
            }
        };

        getDoctors();
    }, []);
    const handleInputChange = (e) => {
        switch (e.target.name) {
            case 'name':
                {
                    setDoctors({
                        ...doctors,
                        [e.target.name]: e.target.value
                    })
                    setDoctorError({
                        ...doctorError,
                        name: (e.target.value.length === 0) ? "this field is required" : ""
                    })
                    break;
                }
            case 'city': {

                if (!location.region) {
                    setLocation({
                        ...location,
                        region: doctors?.location?.region,
                        city: e.target.value
                    })
                }

                setDoctors({
                    ...doctors,
                    location: {
                        ...location,
                        city: e.target.value,
                        region: doctors?.location?.region
                    }
                })

                setDoctorError({
                    ...doctorError,
                    city: (e.target.value.length === 0) ? "this field is required" : ""
                })
                break;

            }
            case 'region': {

                if (!location.city) {
                    setLocation({
                        ...location,
                        city: doctors?.location?.city,
                        region: e.target.value
                    })
                }


                setDoctors({
                    ...doctors,
                    location: {
                        ...location,
                        region: e.target.value
                    }
                })
                setDoctorError({
                    ...doctorError,
                    region: (e.target.value.length === 0) ? "this field is required" : ""
                })

                break;
            }
            case 'start': {
                if (!clinicTime.end) {
                    setClinicTime({
                        ...clinicTime,
                        end: doctors?.clinicTime?.end,
                        start: parseInt(e.target.value)
                    })
                }
                setDoctors({
                    ...doctors,
                    clinicTime: {
                        ...clinicTime,
                        start: parseInt(e.target.value)
                    }
                })
                setDoctorError({
                    ...doctorError,
                    start: (e.target.value.length === 0) ? "this field is required" : ""
                })
                break;
            }
            case 'end': {
                if (!clinicTime.start) {
                    setClinicTime({
                        ...clinicTime,
                        start: doctors?.clinicTime?.start,
                        end: parseInt(e.target.value)
                    })
                }
                setDoctors({
                    ...doctors,
                    clinicTime: {
                        ...clinicTime,
                        end: parseInt(e.target.value)
                    }

                })
                setDoctorError({
                    ...doctorError,
                    end: (e.target.value.length === 0) ? "this field is required" : ""
                })

                break;
            }
            case 'CategoryName': {
                if (!Category.subCategory) {
                    setCategory({
                        ...Category,
                        name: e.target.value,
                        subCategory: doctors?.category?.subCategory
                    })
                }

                setDoctors({
                    ...doctors,
                    category: {
                        ...Category,
                        name: e.target.value
                    }
                })
                setDoctorError({
                    ...doctorError,
                    CategoryName: (e.target.value.length === 0) ? "this field is required" : ""
                })
                break;
            }
            case 'subCategory': {
                if (!Category.name) {
                    setCategory({
                        ...Category,
                        subCategory: e.target.value,
                        name: doctors?.category?.name
                    })
                }
                setDoctors({
                    ...doctors,
                    category: {
                        ...Category,
                        subCategory: e.target.value
                    }
                })
                setDoctorError({
                    ...doctorError,
                    subCategory: (e.target.value.length === 0) ? "this field is required" : ""
                })
                break;
            }
            case 'mobile': {
                let number = e.target.value;
                let regExp = /^01(0|1|2|5)[0-9]{8}$/
                let result = regExp.test(number);

                setDoctors({
                    ...doctors,
                    mobile: e.target.value
                })
                setDoctorError({
                    ...doctorError,
                    mobile: (!result) ? "this is not a valid phone number" : ""
                })
                break;
            }
            case 'information':
                {
                    setDoctors({
                        ...doctors,
                        information: e.target.value
                    })
                    setDoctorError({
                        ...doctorError,
                        information: (e.target.value.length < 100) ? "this field must be at least 100 characters" : ""
                    })
                    break;

                }
            case 'price':
                {
                    setDoctors({
                        ...doctors,
                        price: e.target.value
                    })
                    setDoctorError({
                        ...doctorError,
                        price: (e.target.value.length === 0) ? "this field is required" : ""
                    })
                    break;
                }
            case 'waiting':
                {
                    setDoctors({
                        ...doctors,
                        waiting: e.target.value
                    })
                    setDoctorError({
                        ...doctorError,
                        waiting: (e.target.value.length === 0) ? "this field is required" : ""
                    })
                    break;
                }
            case 'degree':
                {
                    setDoctors({
                        ...doctors,
                        degree: e.target.value
                    })
                    setDoctorError({
                        ...doctorError,
                        degree: (e.target.value.length === 0) ? "this field is required" : ""
                    })
                    break;
                }
            case 'image': {
                setDoctors({
                    ...doctors,
                    imgDoctor: e.target.value
                })
                setDoctorError({
                    ...doctorError,
                    image: (e.target.value.length === 0) ? "this field is required" : ""
                })

            }
            default:
                return doctors;
        }
     //   console.log(doctors);
    }
    const updateDoctors = (e) => {
       // console.log(doctors);
        const doctorsDocs = doc(fs, "Doctors", doctorsId);
        updateDoc(doctorsDocs, doctors);
        history.push('/doctors');
    }
    const addDoctors = async (e) => {
       // console.log(doctors);
        await addDoc(collection(fs, "Doctors"), doctors);
        history.push('/doctors');
    }

    return (
        <>
            <Container className='mx-5 mt-5 p-5'>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

                        {id && <div className='d-flex justify-content-center'>
                            <img src={doctors?.imgDoctor} className='col-4' width={100} height={200}></img>
                        </div>}
                        <Form.Label className=' m-2 fw-bold fs-5 text-danger'>Name</Form.Label>
                        <Form.Control type="text" placeholder="name" value={doctors?.name} name='name' required onChange={(e) => { handleInputChange(e) }} />
                        <div> <small className="text-danger mb-1">{doctorError.name}</small></div>
                        <Form.Label className=' m-2 fw-bold fs-5 text-danger'>Dr Image Url</Form.Label>
                        <Form.Control type="text" placeholder="image url" value={doctors?.imgDoctor} name='image' required onChange={(e) => { handleInputChange(e) }} />
                        <div> <small className="text-danger mb-1">{doctorError.image}</small></div>
                        <Form.Label className=' m-2 fw-bold fs-5 text-danger'>degree</Form.Label>
                        <Form.Control type="text" placeholder="degree" value={doctors?.degree} name='degree' onChange={(e) => { handleInputChange(e) }} />
                        <div> <small className="text-danger mb-1">{doctorError.degree}</small></div>
                        <Form.Label className=' m-2 fw-bold fs-5 text-danger'>Mobile</Form.Label>
                        <Form.Control type="number" placeholder="mobile" value={doctors?.mobile} name='mobile' onChange={(e) => { handleInputChange(e) }} />
                        <div> <small className="text-danger mb-1">{doctorError.mobile}</small></div>
                        <Form.Label className=' m-2 fw-bold fs-5 text-danger'>Price</Form.Label>
                        <Form.Control type="number" placeholder="price" value={doctors?.price} name='price' onChange={(e) => { handleInputChange(e) }} />
                        <div> <small className="text-danger mb-1">{doctorError.price}</small></div>
                        <Form.Label className=' m-2 fw-bold fs-5 text-danger'>Waiting</Form.Label>
                        <Form.Control type="number" placeholder="waiting" value={doctors?.waiting} name='waiting' onChange={(e) => { handleInputChange(e) }} />
                        <div> <small className="text-danger mb-1">{doctorError.waiting}</small></div>
                        <Form.Label className=' m-2 fw-bold fs-5 text-danger'>City</Form.Label>
                        <Form.Control type="text" placeholder="city" value={doctors?.location?.city} name='city' onChange={(e) => { handleInputChange(e) }} />
                        <div> <small className="text-danger mb-1">{doctorError.city}</small></div>
                        <Form.Label className=' m-2 fw-bold fs-5 text-danger'>Region</Form.Label>
                        <Form.Control type="text" placeholder="region" value={doctors?.location?.region} name='region' onChange={(e) => { handleInputChange(e) }} />
                        <div> <small className="text-danger mb-1">{doctorError.region}</small></div>
                        <Form.Label className=' m-2 fw-bold fs-5 text-danger'>Clinic Time Start</Form.Label>
                        <Form.Control type="number" placeholder="start" value={doctors?.clinicTime?.start} name='start' onChange={(e) => { handleInputChange(e) }} />
                        <div> <small className="text-danger mb-1">{doctorError.start}</small></div>
                        <Form.Label className=' m-2 fw-bold fs-5 text-danger'>Clinic Time End</Form.Label>
                        <Form.Control type="number" placeholder="end" value={doctors?.clinicTime?.end} name='end' onChange={(e) => { handleInputChange(e) }} />
                        <div> <small className="text-danger mb-1">{doctorError.end}</small></div>
                        <Form.Label className=' m-2 fw-bold fs-5 text-danger'>Category</Form.Label>
                        <Form.Control type="text" placeholder="categoryName" value={doctors?.category?.name} name='CategoryName' onChange={(e) => { handleInputChange(e) }} />
                        <div> <small className="text-danger mb-1">{doctorError.CategoryName}</small></div>
                        <Form.Label className=' m-2 fw-bold fs-5 text-danger'>subCategory</Form.Label>
                        <Form.Control type="text" placeholder="subCategory" value={doctors?.category?.subCategory} name='subCategory' onChange={(e) => { handleInputChange(e) }} />
                        <div> <small className="text-danger mb-1">{doctorError.subCategory}</small></div>
                        <Form.Label className=' m-2 fw-bold fs-5 text-danger'>Information</Form.Label>
                        <Form.Control required type="text" placeholder="information" as="textarea" style={{ height: '100px' }} value={doctors?.information} name='information' onChange={(e) => { handleInputChange(e) }} />
                        <div> <small className="text-danger mb-1">{doctorError.information}</small></div>
                    </Form.Group>
                    {doctorsId && <Button type="button" className={doctorError.name || doctorError.price || doctorError.degree || doctorError.mobile ||
                        doctorError.waiting || doctorError.start || doctorError.end || doctorError.information || doctorError.region || doctorError.city || doctorError.CategoryName || doctorError.subCategory
                        ? 'mb-2 btn-dark disabled' : 'mb-2 btn-dark'} onClick={(e) => { updateDoctors(e) }}>Update</Button>}
                    {!doctorsId && <Button type="button" className={doctorError.name || doctorError.price || doctorError.degree || doctorError.mobile ||
                        doctorError.waiting || doctorError.start || doctorError.end || doctorError.information || doctorError.region || doctorError.city || doctorError.CategoryName || doctorError.subCategory
                        ? 'mb-2 btn-dark disabled' : 'mb-2 btn-dark'} onClick={(e) => { addDoctors(e) }}>Add</Button>}

                </Form>
            </Container>
        </>
    )
}