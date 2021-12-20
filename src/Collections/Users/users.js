import { useState, useEffect } from 'react';
import { fs } from '../../FirebaseConfig';
import { collection, doc, getDocs,updateDoc,query,where,getDoc } from 'firebase/firestore';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Table from 'react-bootstrap/Table'


function User() {
  const [users, setUsers] = useState([]);
  const [user,setUser]=useState({});
  const [refresh,setRefresh]=useState(false);
  const usersList=[];
  useEffect(() => {
    const getUsers = async () => {
      let q = query(collection(fs, 'users'),
        where('isDeleted', '==', false));
      let snapshot = await getDocs(q)
      snapshot.forEach((doc) => {
        usersList.push({ ...doc.data(), id: doc.id });
      });
      setUsers(usersList);
    }
    getUsers();
  }, [])
  const deleteUser = async (id) => {
    const userDoc = await getDoc(doc(fs, "users", id));
    setUser(userDoc.data());
    const deletedUser={...user,isDeleted:true};
  //  console.log(deletedUser);
    const usersDocs = doc(fs, "users", id);
   updateDoc(usersDocs,deletedUser).then(res=>{
     setRefresh(!refresh);
    //console.log(refresh)
   });

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
                    <FontAwesomeIcon icon={faTrash} className='icon' onClick={() => { deleteUser(user.id) }}></FontAwesomeIcon>
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