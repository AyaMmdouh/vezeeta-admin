import { useState } from "react";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import { getDocs, collection, query, where } from 'firebase/firestore';
import { Button, Container } from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import { auth, fs } from "../FirebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import logedUser from "../store/actions/login";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import isAuth from "../store/actions/isAuth";
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();
    const loged = useSelector(state => state.login.login);
    // console.log(loged)
    onAuthStateChanged(auth, (currentUser) => {
        console.log(currentUser);
        if (currentUser) {
            dispatch(isAuth(true));
            console.log(currentUser)
        } else {
            dispatch(isAuth(false));
        }

    });
    const login = async () => {
        var q = query(collection(fs, 'users'),
            where('isAdmin', '==', true),
            where('email', '==', email));
        var snapshot = await getDocs(q)
        snapshot.forEach((doc) => {
            //  console.log(doc.data());
            dispatch(logedUser(email, password));
            if (loged) {
                 localStorage.setItem("isAuth",true)
                history.push(`/doctors`);
               
            }
        })
    }

    // const register=()=>{
    //     createUserWithEmailAndPassword(auth,email,password);
    // }
    const logout = async () => {
        await signOut(auth);
        dispatch(isAuth(false));
    };
    return (
        <Container className='mx-5 mt-5 p-5'>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label className=' m-2 fw-bold fs-5 text-danger'>Email</Form.Label>
                    <Form.Control type="text" placeholder="Email" name='email' onChange={(e) => { setEmail(e.target.value) }} />
                    <Form.Label className=' m-2 fw-bold fs-5 text-danger'>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name='password' onChange={(e) => { setPassword(e.target.value) }} />
                    <Button type="button" className="btn btn-danger m-3" onClick={login}>Login</Button>
                    <Button type="button" className="btn btn-danger m-3" onClick={logout}>Logout</Button>
                </Form.Group>
            </Form>
        </Container>
    )
}