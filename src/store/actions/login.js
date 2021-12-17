import {
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from '../../FirebaseConfig'
const logedUser = (email, password) => {
    return (dispatch) => {
       
        return signInWithEmailAndPassword(auth, email, password).then(res => {
            dispatch({ type: "LOGIN" ,payload:res});

        }).catch(error=>{
            console.log(error.message)
            dispatch({ type: "LOGIN" });

        });
    }
}
    export default logedUser;