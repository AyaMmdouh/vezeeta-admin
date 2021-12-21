//import 'firebase/firestore';
//import 'firebase/auth';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import City from './Collections/City/City';
import CityUpdate from './Collections/City/CityUpdate';
import DoctorsUpdate from './Collections/Doctor/doctorsUpdate';
import Users from "./Collections/Users/users";
import Reservation from './Collections/Reservation/reservation';
import Doctor from './Collections/Doctor/doctor';
// import Navbar from "./Navbar/navbar";

function App() {
  return (
    <>
    {/* <Navbar></Navbar> */}
    <Router>
      <Switch>
        <Route path={"/"} exact component={Doctor}></Route>
        <Route path={"/UpdateDoctor/:id"} exact component={DoctorsUpdate}></Route>
        <Route path={"/addDoctor"} exact component={DoctorsUpdate}></Route>
        <Route path={"/deleteDoctor"} exact component={Doctor}></Route>
        <Route path={"/city"} exact component={City}></Route>
        <Route path={"/addCity"} exact component={CityUpdate}></Route>
        <Route path={"/updateCity/:id"} exact component={CityUpdate}></Route>
        <Route path={"/users"} exact component={Users}></Route>
       
        <Route path={"/reservation"} exact component={Reservation}></Route>
      </Switch>
     </Router>
    </>
  );
}

export default App;
