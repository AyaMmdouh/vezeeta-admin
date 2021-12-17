import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './login.css';
import {Card} from "react-bootstrap";
import 'react-bootstrap';

export default function Register() {
    const [user, setUser] = useState({
        Email: "",
        password:"",
      });
    const handleInputChange = (e) => {
        console.log(e.target.value, e.target.name);
        const req = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        const pass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        setUser({
            ...user,
            [e.target.name]: e.target.value,
          });
          switch (e.target.name) {
           
            case "Email":
              setUserErrors({
                ...userErrors,
                Email: req.test(e.target.value) === false? "This Email is invalid" : null,
              });
              break;
          
            case "password":
                setUserErrors({
                    ...userErrors,
                    password: pass.test(e.target.value) === false? "password is invalid" : null,
                });
                break;
        
            default:
              break;
          }
      }
    const [userErrors, setUserErrors] = useState({
        Email: null,
        password:null,
      });
    const submitAddUser = (e) => {
        e.preventDefault();
        if( !userErrors.Email  && !userErrors.password ){
            console.log(user);
        }
      };
      const [passwordShown, setPasswordShown] = useState(false);
      const togglePassword = () => {
        setPasswordShown(!passwordShown);
      };
  return (
    <>
    <Card className="bg-dark text-white">
  <Card.Img src="R.png" alt="" />
    <h2>Login</h2>
    <div className="text-lg-left">
    <form className="col-md-8 text-left m-auto" onSubmit={(e) => submitAddUser(e)}>
      
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label text-lg-left">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="Email"
            value={user.Email}
            onChange={(e) => handleInputChange(e)}
          />
         <small className="text-danger">{userErrors.Email}</small>
        </div>
      
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type={passwordShown ? "text" : "password"} 
            className="form-control"
            name="password"
            id="pass"
            value={user.password}
            onChange={(e) => handleInputChange(e)}
          />
        <small className="text-danger">{userErrors.password}</small>
        </div>
      

        <button type="submit" className="btn btn-success">
          Login
        </button>
        <button type="button" className="btn btn-danger" onClick={togglePassword}>
            show password
        </button>
      </form>
    </div>
    </Card>
    </>
  );
}