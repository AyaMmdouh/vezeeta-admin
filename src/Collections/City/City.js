import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { deleteDoc, doc } from 'firebase/firestore'
import { fs } from '../../FirebaseConfig';
import getId from "../../store/actions/cityid";
import setCityList from "../../store/actions/cities";
import setCity from "../../store/actions/city";
import { Button, Card, Container, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import './City.css'
export default function City() {
    const [cities, setCities] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();
    const res = useSelector(state => state.cities.city);
    useEffect(() => {
        dispatch(setCityList());
        setCities(res);
        //    console.log(cities);
    }, [res]);


    const updateCity = (id) => {
        dispatch(getId(id));
        dispatch(setCity(id));
        history.push(`/updateCity/${id}`);
    }
    const refreshPage = () => {
        window.location.reload();
    }
    const deleteCity = async (id) => {
        const cityDoc = doc(fs, "city", id);
        await deleteDoc(cityDoc).then(res => {
            refreshPage()
        })
    }
    const addNewDoc = () => {
        history.push("/addCity");
    }
    return (
        <>
            <Container className="container row d-flex justify-content-center" dir="rtl">
                {cities?.map((city) => {
                    return (
                        <Card className="bg-light col-3" style={{ backgroundColor: "lightgray", padding: 20, margin: 10, borderRadius: 10 }}>
                            <Card.Title className="fs-4">{city?.namear}</Card.Title>
                            {city?.regions?.map((region) => {
                                return (
                                    <Card.Text>
                                        <ListGroup>
                                            <ListGroup.Item className="text-center fs-5 bg-dark text-light">{region.namear}</ListGroup.Item>
                                        </ListGroup>

                                    </Card.Text>
                                )
                            })}
                            <div className="d-flex flex-row">
                                <FontAwesomeIcon icon={faEdit} style={{ margin: 3 }} className="icon" onClick={() => { updateCity(city.id) }}></FontAwesomeIcon>
                                <FontAwesomeIcon icon={faTrash} style={{ margin: 3 }} className="icon" onClick={() => { deleteCity(city.id) }}></FontAwesomeIcon>
                            </div>
                        </Card>
                    )
                })}
            </Container>
        </>
    )
}