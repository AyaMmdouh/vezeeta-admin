import { useState, useEffect } from 'react';


import { fs } from '../../FirebaseConfig';
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ListGroup, Card, Container, } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";


function Reservation() {


  const [Reservation, setReservation] = useState([])

  const reservationCollectionRef = collection(fs, "Reservation")
  //    const createReservation =async () =>{
  //      await addDoc(reservationCollectionRef,{ name : newName})

  //    };
  const updateReservation = async (id) => {
    const reservationDoc = doc(fs, "Reservation", id)
    const newFields = {}
    await updateDoc(reservationDoc, newFields)


  };

  const deleteReservation = async (id) => {
    const reservationDoc = doc(fs, "Reservation", id)
    await deleteDoc(reservationDoc)

  };
  useEffect(() => {

    const getReservation = async () => {
      const dataDocs = await getDocs(reservationCollectionRef);
      setReservation(dataDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id })))


    };
    getReservation();

  }, [])

  return (
    <div className="App">
      <Container className="container row d-flex justify-content-center" dir="rtl">
        {Reservation.map((reservation) => {
          return (
            <Card className="bg-light col-3" style={{ backgroundColor: "lightgray", width: '18rem' }}>
              <div>
                {" "}

                {/* <Card.Title className="fs-4"> <h4>bookDate: {reservation.bookDate}</h4></Card.Title> */}

                <Card.Text>
                  <ListGroup>

                    <ListGroup.Item className="text-start  bg-success text-light" style={{ backgroundColor: "lightgray", height: '3rem' }} ><p>bookDate:{reservation.bookDate}</p></ListGroup.Item>
                    <ListGroup.Item className="text-start  bg-primary text-light" style={{ backgroundColor: "lightgray", height: '3rem' }} ><p>bookhour:{reservation.bookhour}</p></ListGroup.Item>
                    <ListGroup.Item className="text-start  bg-primary text-light" style={{ backgroundColor: "lightgray", height: '4rem' }}><p> {reservation.doctorName}:DoctorName</p></ListGroup.Item>
                    <ListGroup.Item className="text-start  bg-primary text-light" style={{ backgroundColor: "lightgray", height: '3rem' }}><p>Doctorphone: {reservation.doctorPhone}</p></ListGroup.Item>
                    <ListGroup.Item className="text-start  bg-primary text-light" style={{ backgroundColor: "lightgray", height: '3rem' }}><p>:?isCancelled {reservation.isCancelled}</p></ListGroup.Item>
                    <ListGroup.Item className="text-start  bg-primary text-light" style={{ backgroundColor: "lightgray", height: '3rem' }}><p>Price: {reservation.price}</p></ListGroup.Item>
                    <ListGroup.Item className="text-start  bg-primary text-light" style={{ backgroundColor: "lightgray", height: '3rem' }}><p>userEmail: {reservation.userEmail}</p></ListGroup.Item>
                    <ListGroup.Item className="text-start  bg-primary text-light" style={{ backgroundColor: "lightgray", height: '3rem' }}><p>userName: {reservation.userName}</p></ListGroup.Item>
                    <ListGroup.Item className="text-start  bg-primary text-light" style={{ backgroundColor: "lightgray", height: '3rem' }}><p>userPhone: {reservation.userPhone}</p></ListGroup.Item>
                    <ListGroup.Item className="text-start  bg-primary text-light" style={{ backgroundColor: "lightgray", height: '3rem' }}><p>loctionCity: {reservation.doctorLocation.city}</p></ListGroup.Item>
                    <ListGroup.Item className="text-start  bg-primary text-light" style={{ backgroundColor: "lightgray", height: '4rem' }}><p>LocationRegion: {reservation.doctorLocation.region}</p></ListGroup.Item>



                  </ListGroup>




                </Card.Text>
                <div className="d-flex flex-row">
                  <FontAwesomeIcon icon={faEdit} style={{ margin: 3 }} className="icon" onClick={() => { updateReservation(reservation.id) }}></FontAwesomeIcon>
                  <FontAwesomeIcon icon={faTrash} style={{ margin: 3 }} className="icon" onClick={() => { deleteReservation(reservation.id) }}></FontAwesomeIcon>
                </div>






              </div>
            </Card>



          );


        })}
      </Container>
    </div>
  );
}

export default Reservation;