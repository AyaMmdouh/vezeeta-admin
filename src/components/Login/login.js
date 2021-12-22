import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import {
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { getDocs, collection, query, where } from 'firebase/firestore'
import { auth, fs } from "../../FirebaseConfig";
import logedUser from "../../store/actions/login";
import isAuth from "../../store/actions/isAuth";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userErrors, setUserErrors] = useState({
    Email: null,
    password: null,
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const loged = useSelector(state => state.login.login);
  //console.log(loged)
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      dispatch(isAuth(true));
      localStorage.setItem("isAuth", true);
      // console.log(currentUser)
    } else {
      dispatch(isAuth(false));
      localStorage.setItem("isAuth", false);
    }
  });
  const login = async () => {
    var q = await query(collection(fs, 'users'),
      where('isAdmin', '==', true),
      where('email', '==', email));
    var snapshot = await getDocs(q)
    snapshot.forEach((doc) => {
      // console.log(doc.data());
      dispatch(logedUser(email, password));
      if (loged) {
        localStorage.setItem("isAuth", true);
        dispatch(isAuth(true));
        history.push(`/city`);
      }

    })
  }
  const logout = async () => {
    await signOut(auth);
    localStorage.setItem("isAuth", false);
    dispatch(isAuth(false));
  };

  const handleInputChange = (e) => {
    // console.log(e.target.value, e.target.name);
    const req = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    const pass = /^[a-zA-Z0-9]{6,16}$/;
    switch (e.target.name) {
      case "email":
        setUserErrors({
          ...userErrors,
          Email: req.test(e.target.value) === false ? "This is invalid email format" : null,
        });
        setEmail(e.target.value);
        break;
      case 'password':
        setUserErrors({
          ...userErrors,
          password: pass.test(e.target.value) === false ? "password must be at least 6 characters" : null,
        });
        setPassword(e.target.value)
        break;

      default:
        break;
    }
  }
  return (
    <>
      <div className="d-flex flex-column" >
        <div>
          <Card className="bg-dark text-white"style={{height:"100vh"}}>
            <Card.Img src="R.png" alt="" />
            <div className="text-lg-left mt-5">
              <h2 className="text-center mx-3">Login</h2> 
              <form className="col-md-8 text-left m-auto mt-5">
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label text-lg-left">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="example123@gmail.com"
                    value={email}
                    name='email'
                    onChange={(e) => handleInputChange(e)}
                  />
                  <small className="text-danger">{userErrors.Email}</small>
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name='password'
                    id="pass"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => handleInputChange(e)}
                  />
                  <small className="text-danger">{userErrors.password}</small>
                </div>

                {/* <button type="submit" className="btn btn-success">
              Login
            </button> */}
                <Button type="button" className={userErrors.Email || userErrors.password ? "btn btn-danger m-3 disabled text-center" : "btn btn-danger m-3 text-center"} onClick={login}>Login</Button>
                {/*   <Button type="button" className="btn btn-danger m-3" onClick={logout}>Logout</Button> */}
              </form>
            </div>
          </Card>
        </div>

      </div>
    </>
  );
}