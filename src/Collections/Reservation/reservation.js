import { useState, useEffect } from 'react';
import { collection, doc, getDocs, updateDoc, deleteDoc, query, where, getDoc, onSnapshot } from 'firebase/firestore';
import { fs } from '../../FirebaseConfig';
import { ListGroup, Card, Container, } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
function Reservation() {
  const [Reservation, setReservation] = useState([])
  const [reserveItem, setReserveItem] = useState({});
  const[refresh,setRefresh]=useState(false);
  const reservetionList = [];
  useEffect(() => {
    getReservation();
  }, [])
  const getReservation = async () => {
    let q = query(collection(fs, "Reservation"),
      where('isCancelled', '==', false));
    let snapshot = await getDocs(q)
    snapshot.forEach((doc) => {
      reservetionList.push({ ...doc.data(), id: doc.id });
    });
    setReservation(reservetionList);
    console.log(reservetionList.length)
  }

  const deleteReservation = async (id) => {
    const reserDoc = await getDoc(doc(fs, "Reservation", id));
    setReserveItem(reserDoc.data());
    const deletedDoc = { ...reserveItem, isCancelled: true };
    const reserve = doc(fs, "Reservation", id);
    updateDoc(reserve, deletedDoc).then(res=>{
      setRefresh(!refresh)
    })
    console.log(deletedDoc)
  };
  return (
    <div className="App">
      <Container className="container row d-flex justify-content-center" dir="rtl">
        {Reservation.map((reservation) => {
          return (
            <Card className="bg-light col-3" style={{ backgroundColor: "lightgray", width: '18rem' }}>
              <div>
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