import { useState, useEffect } from "react";
import { collection, getDocs } from 'firebase/firestore'
import { fs } from '../../FirebaseConfig';
import './City.css'
import { Button, Card, Container, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
export default function City() {
    const [cities, setCities] = useState([]);
    const cityCollectionRef = collection(fs, "city");
    const history = useHistory();
    // console.log(cityCollectionRef);

    useEffect(() => {
        const getCity = async () => {
            const data = await getDocs(cityCollectionRef);
            setCities(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            //console.log(cities)
        };

        getCity();
    }, []);
    const updateDoc = (id) => {
        history.push(`/updateCity/${id}`)
    }
    const deleteDoc = (id) => {
        console.log(id);
    }
    const addNewDoc = () => {
        history.push("/addCity");
    }
    return (
        <>
            <Button className="btn btn-brimary m-5 p-2 col-2" onClick={addNewDoc}>Add new Doc ?</Button>
            <Container className="container row d-flex justify-content-center" dir="rtl">
                {cities.map((city) => {
                    return (
                        <Card className="bg-light col-3" style={{ backgroundColor: "lightgray", padding: 20, margin: 10, borderRadius: 10 }}>
                            <Card.Title className="fs-4">{city.namear}</Card.Title>
                            {city.regions?.map((region) => {
                                return (
                                    <Card.Text>
                                        <ListGroup>
                                            <ListGroup.Item className="text-center fs-5 bg-dark text-light">{region.namear}</ListGroup.Item>
                                        </ListGroup>

                                    </Card.Text>
                                )
                            })}
                            <div className="d-flex flex-row">
                                <FontAwesomeIcon icon={faEdit} style={{ margin: 3 }} className="icon" onClick={() => { updateDoc(city.id) }}></FontAwesomeIcon>
                                <FontAwesomeIcon icon={faTrash} style={{ margin: 3 }} className="icon" onClick={() => { deleteDoc(city.id) }}></FontAwesomeIcon>
                            </div>

                        </Card>

                    )
                })}
            </Container>
        </>
    )
}