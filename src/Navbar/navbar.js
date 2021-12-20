import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
    signOut
} from "firebase/auth";
import { auth } from "../FirebaseConfig";
import isAuth from "../store/actions/isAuth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { faUserLock } from "@fortawesome/free-solid-svg-icons";
import './Navbar.css'
export default function NavbarComponent() {
    const user = useSelector(state => state.login.login);
    const history = useHistory();
    const dispatch = useDispatch();
    const logout =async () => {
        await signOut(auth);
        localStorage.setItem("isAuth",false);
        dispatch(isAuth(false));
        history.push(`/login`);
    };
    return (
        <Navbar bg="dark px-5 py-3" variant="dark">
            <Nav className="me-auto d-flex">
                <Navbar.Collapse>
                    <Link className="mx-2 link" to="/users">Users</Link>
                    <Link className="mx-2 link" to="/doctors">Doctors</Link>
                    <Link className="mx-2 link" to="/city">City</Link>
                    <Link className="mx-2 link" to="/insurance">Insurance</Link>
                </Navbar.Collapse>
                <NavDropdown title={user?.user?.email} className="justify-content-end">
                    <NavDropdown.Item href="#" onClick={logout}><FontAwesomeIcon icon={faUserLock} /> Logout </NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar>
    );
}
{/* <Link to="/counter">Counter</Link> */ }