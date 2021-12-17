import { getDoc ,doc} from "firebase/firestore";
import { fs } from "../../FirebaseConfig";
const setCity = (id) => (dispatch) => {
    return getDoc(doc(fs, "city", id))
        .then(res => {
            dispatch({ type: "CITY", payload: res.data()})
          //  console.log(res.data().regions)
          //  console.log(res.data())
        }).catch(error => {
            console.log(error.message);
        })
}
export default setCity;