import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useState, useEffect } from "react";
import { fs } from '../../FirebaseConfig';
import { doc, getDoc, updateDoc, collection, addDoc } from 'firebase/firestore'
import Form from 'react-bootstrap/Form'
import { Container, Button } from 'react-bootstrap';
export default function InsuranceUpdate() {
    const params = useParams()
    const history = useHistory();
    const id = params.id;
    const [insuranceId, setInsuranceId] = useState(id);
    const [insurance, setInsurance] = useState({})
    const [insuranceError, setInsuranceError] = useState({
        namear: null,
        nameen: null
    })
    useEffect(() => {
        const getInsurance = async () => {
            if (id) {
                const insuranceDocs = await getDoc(doc(fs, "Insurance", id));
                setInsurance(insuranceDocs.data());
            }
        };

        getInsurance();
    }, []);
    const handleInputChange = (e) => {
        setInsurance({
            ...insurance,
            [e.target.name]: e.target.value
        });
        switch (e.target.name) {
            case 'namear': {
                setInsuranceError({
                    ...insuranceError,
                    namear: (e.target.value.length === 0) ? "this field is required" : ""
                })
                break;
            }
            case 'nameen': {
                setInsuranceError({
                    ...insuranceError,
                    nameen: (e.target.value.length === 0) ? "this field is required" : ""
                })
                break;
            }
            default:
                return insuranceError;
        }

    }
    const updateInsurance = (e) => {
        console.log(insurance);
        const insurancDocs = doc(fs, "Insurance", insuranceId);
        updateDoc(insurancDocs, insurance);
        history.push('/insurance');
    }
    const addInsurance = async (e) => {
        console.log(insurance);
        await addDoc(collection(fs, "Insurance"), insurance);
        setInsurance({
            namear: "",
            nameen: ""
        });
    }

    return (
        <>
            <Container className='mx-5 mt-5 p-5'>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label className=' m-2 fw-bold fs-5 text-danger'>Name in arabic</Form.Label>
                        <Form.Control type="text" placeholder="name in arabic" value={insurance.namear} name='namear' onChange={(e) => { handleInputChange(e) }} />
                        <div> <small className="text-danger mb-1">{insuranceError.namear}</small></div>
                        <Form.Label className=' m-2 fw-bold fs-5 text-danger'>Name in english</Form.Label>
                        <Form.Control type="text" placeholder="name in english" value={insurance.nameen} name='nameen' onChange={(e) => { handleInputChange(e) }} />
                        <div> <small className="text-danger mb-1">{insuranceError.nameen}</small></div>
                    </Form.Group>
                    {insuranceId && <Button type="button" className={insuranceError.namear || insuranceError.nameen ? 'mb-2 btn-dark disabled ' : 'mb-2 btn-dark'} onClick={(e) => { updateInsurance(e) }}>Update</Button>}
                    {!insuranceId && <Button type="button" className={insuranceError.namear || insuranceError.nameen ? 'mb-2 btn-dark disabled ' : 'mb-2 btn-dark'} onClick={(e) => { addInsurance(e) }}>Add</Button>}
                </Form>
            </Container>
        </>
    )
}