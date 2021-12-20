import { useState, useEffect } from "react";
import { collection, getDocs } from 'firebase/firestore'
import { fs } from '../../FirebaseConfig';
import { Button, Card, Container, ListGroup, Carousel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash,faUserLock } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Table from 'react-bootstrap/Table'
import './doctor.css'
export default function Doctor() {
  const [doctors, setDoctors] = useState([]);
  const doctorCollectionRef = collection(fs, "Doctors");
  const history = useHistory();

  useEffect(() => {
    const getDoctor = async () => {
      const data = await getDocs(doctorCollectionRef);
      setDoctors(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getDoctor();
  }, []);
  const updateDoc = (id) => {
    history.push(`/updateDoctor/${id}`)
  }
  const deleteDoc = (id) => {
    console.log(id);
  }
  const addNewDoc = () => {
    history.push("/addDoctor");
  }
  return (
    <>
      <Button className="btn btn-dark m-5 p-2 col-2 " onClick={addNewDoc}>إضافة دكتور جديد؟</Button>
      <Container className="container row d-flex justify-content-center mx-auto" dir="rtl">
        <Table striped bordered hover variant="dark">
          <thead className="text-center">
            <tr>
              <th >#</th>
              <th></th>
              <th>الأسم</th>
              <th>الدرجة العلمية</th>
              <th>التخصص</th>
              <th>المنطقة</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-center" >
            {doctors?.map((doctor, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td> <img src={doctor.imgDoctor} width={100} height={50} style={{borderRadius: '50%' }}/></td>
                  <td>{doctor?.name}</td>
                  <td>{doctor?.degree}</td>
                  <td>{doctor?.category?.name}</td>
                  <td>{doctor?.location?.city} - {doctor?.location?.region}</td>
                  <td>
                    <FontAwesomeIcon icon={faTrash} className="mx-1 icon" onClick={() => { deleteDoc(doctor?.id) }}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faEdit} className="mx-1 icon" onClick={() => { updateDoc(doctor?.id) }}></FontAwesomeIcon>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Container>
    </>
  )
}