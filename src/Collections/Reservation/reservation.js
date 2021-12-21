import { useState, useEffect } from 'react';
import { collection, doc, getDocs, updateDoc, deleteDoc, query, where, getDoc, onSnapshot } from 'firebase/firestore';
import { fs } from '../../FirebaseConfig';
import {  Container,Table,td,th } from 'react-bootstrap';
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
      <Container className="container row d-flex justify-content-center mx-auto my-auto" dir="ltr">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>bookDate</th>
              <th>bookhour</th>
              <th>doctorName</th>
              <th>doctorPhone</th>
              <th>doctorPhone</th>
              <th>price</th>
              <th>userEmail</th>
              <th>userName</th>
              <th>userPhone</th>
              <th>city</th>
              <th>region</th>
              <th>role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Reservation?.map((reservation, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{reservation.bookDate}</td>
                  <td>{reservation.bookhour}</td>
                  <td>{reservation.doctorName}</td>
                  <td>{reservation.doctorPhone}</td>
                  <td>{reservation.price}</td>
                  <td>{reservation.userEmail}</td>
                  <td>{reservation.userName}</td>
                  <td>{reservation.userPhone}</td>
                  <td>{reservation.doctorLocation.city}</td>
                  <td>{reservation.doctorLocation.region}</td>
                  {reservation.isCancelled && <td>Cancelled</td>}
                  
                  <td>
                    <FontAwesomeIcon icon={faTrash} className='icon' onClick={() => { deleteReservation(reservation.id) }}></FontAwesomeIcon>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </div >
  );
  ////////////////////////////////////////////////////////
  
}

export default Reservation;