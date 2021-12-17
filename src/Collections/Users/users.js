

import { useState , useEffect} from 'react';


import { fs } from '../../FirebaseConfig';
import {collection, doc, getDocs,addDoc, updateDoc,deleteDoc} from 'firebase/firestore';
import { Button,ListGroup ,Card,Container} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";


function User() {
  const [newName, setNewName] = useState("")
  const [users,setUsers] = useState([])
  const usersCollectionRef = collection(fs , "users")
   const createUser =async () =>{
     await addDoc(usersCollectionRef,{ name : newName})

   };
   const updateUser = async (id) => {
     const userDoc = doc(fs,"users",id)
     const newFields = {}
     await updateDoc(userDoc,newFields)


   };

   const deleteUser = async (id) =>{
    const userDoc = doc(fs,"users",id)
    await deleteDoc(userDoc)

   };
  useEffect(()=>{

    const getUsers = async () =>{
      const dataDocs = await getDocs(usersCollectionRef );
      setUsers(dataDocs.docs.map((doc)=>({...doc.data(), id: doc.id})))
      

    };
    getUsers();

  }, [] )
  console.log(users);
  return (
    <div className="App">
      {/* <input placeholder='name..' onChange={(event)=>{setNewName(event.target.value);}}></input>
      <Button className="btn btn-brimary m-5 p-2 col-2" onClick={createUser}>Add new Doc ?</Button> */}
      {/* <Button onClick={createDoctor}>create doctor</Button> */}
      <Container className="container row d-flex justify-content-center" dir="rtl">
      {users.map((user)=>{return(
         <Card className="bg-light col-3" style={{ backgroundColor: "lightgray", padding: 20, margin: 10, borderRadius: 10 }}>
         <div>
          {" "}
         
          <Card.Title className="fs-4"> <h4>Name: {user.name}</h4></Card.Title>
          <Card.Text>
          <ListGroup>

          <ListGroup.Item className="text-start  bg-primary text-light" style={{ backgroundColor: "lightgray", height:'4rem' }}><p>id:{user.id}</p></ListGroup.Item>
          <ListGroup.Item className="text-start  bg-primary text-light"style={{ backgroundColor: "lightgray", height:'4rem' }}><p>mobile:{user.phone}</p></ListGroup.Item>
          <ListGroup.Item className="text-start  bg-primary text-light"style={{ backgroundColor: "lightgray", height:'4rem' }}><p>email:{user.email}</p></ListGroup.Item>
          <ListGroup.Item className="text-start  bg-primary text-light"style={{ backgroundColor: "lightgray", height:'4rem' }}><p>:is Admin{user.isAdmin}</p></ListGroup.Item>
          <ListGroup.Item className="text-start  bg-primary text-light"style={{ backgroundColor: "lightgray", height:'4rem' }}><p>:is Doctor{user.isDoctor}</p></ListGroup.Item>
          </ListGroup>

                                    </Card.Text>
                                    <div className="d-flex flex-row">
                                <FontAwesomeIcon icon={faEdit} style={{ margin: 3 }} className="icon" onClick={() => { updateUser(users.id) }}></FontAwesomeIcon>
                                <FontAwesomeIcon icon={faTrash} style={{ margin: 3 }} className="icon" onClick={() => { deleteUser(users.id) }}></FontAwesomeIcon>
                            </div>

                        
         
          {/* <ListGroup.Item variant="primary"><Button onClick={()=>{deleteUser(user.id);}}>Delete User</Button></ListGroup.Item> */}
         
          
      </div>
      </Card>
      
     
      
      );
      
      
    })}
    </Container>
    
     
     
        <>
            
                   
                           
        </>
    
      

    </div>
  );
}

export default User;