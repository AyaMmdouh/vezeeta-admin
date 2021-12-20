import { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'
import { fs } from '../../FirebaseConfig';
import { Button, Card, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './Insurance.css'
export default function Insurance() {
    const [insurances, setInsurances] = useState([]);
    const insuranceCollectionRef = collection(fs, "Insurance");
    const history = useHistory();
    useEffect(() => {
        const getInsuranc = async () => {
            const data = await getDocs(insuranceCollectionRef);
            setInsurances(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getInsuranc();
    }, []);

    const updateInsurance = (id) => {
        history.push(`/updateInsurance/${id}`)
    }
    const deleteInsurance = async (id) => {
        const insurancDoc = doc(fs, "Insurance", id);
        await deleteDoc(insurancDoc);
        alert('Doc Deleted Successfully ');
    }
    const addNewDoc = () => {
        history.push("/addInsurance");
    }
    return (
        <>
            <Button className="btn m-5 p-2 col-2 btn-dark" onClick={addNewDoc}>Add New Doc ?</Button>
            <Container className="container row d-flex justify-content-center" dir="rtl">
                {insurances.map((insurance) => {
                    return (
                        <Card className="bg-light col-3 p-3" key={insurance.namear} style={{ backgroundColor: "lightgray", padding: 20, margin: 10, borderRadius: 10 }}>
                            <Card.Title className="fs-4">{insurance.namear}</Card.Title>
                            <div className="d-flex flex-row">
                                <FontAwesomeIcon icon={faEdit} style={{ margin: 3 }} className="icon" onClick={() => { updateInsurance(insurance.id) }}></FontAwesomeIcon>
                                <FontAwesomeIcon icon={faTrash} style={{ margin: 3 }} className="icon" onClick={() => { deleteInsurance(insurance.id) }}></FontAwesomeIcon>
                            </div>
                        </Card>
                    )
                })}
            </Container>

        </>
    )
}