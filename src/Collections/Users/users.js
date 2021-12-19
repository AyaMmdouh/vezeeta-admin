import { useState, useEffect } from 'react';
import { fs } from '../../FirebaseConfig';
import { collection, doc, getDocs, deleteDoc } from 'firebase/firestore';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Table from 'react-bootstrap/Table'


function User() {
  const [users, setUsers] = useState([])
  const usersCollectionRef = collection(fs, "users")

  useEffect(() => {
    const getUsers = async () => {
      const dataDocs = await getDocs(usersCollectionRef);
      setUsers(dataDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    };
    getUsers();

  }, [])
  const deleteUser = async (id) => {
    const userDoc = doc(fs, "users", id)
    await deleteDoc(userDoc)

  };

  return (
    <div className="App">
      <Container className="container row d-flex justify-content-center mx-auto my-auto" dir="ltr">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  {user.isAdmin && <td>Admin</td>}
                  {user.isDoctor && <td>Doctor</td>}
                  <td>
                    <FontAwesomeIcon icon={faTrash} onClick={() => { deleteUser(user.id) }}></FontAwesomeIcon>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </div >
  );
}

export default User;