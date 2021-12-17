import { collection, getDocs } from "firebase/firestore";
import { fs } from "../../FirebaseConfig";
const cityCollectionRef = collection(fs, "city");
const setCityList = () => (dispatch) => {
    return getDocs(cityCollectionRef)
    .then(res => {
        dispatch({ type: "CITIES", payload: res.docs.map((doc) => ({ ...doc.data(), id: doc.id }) ) }); 
        //console.log(res)
    }).catch(error => {
        console.log(error)
    })
}
export default setCityList;

