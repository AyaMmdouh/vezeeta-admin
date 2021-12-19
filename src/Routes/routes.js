import {
    Switch,
    Route,
} from "react-router-dom";
import PrivateRoute from "./privateRoutes";
import City from '../Collections/City/City';
import CityUpdate from '../Collections/City/CityUpdate';
import Insurance from "../Collections/Insurance/Insurance";
import InsuranceUpdate from "../Collections/Insurance/InsuranceUpdate";
import User from "../Collections/Users/users";
import Reservation from "../Collections/Reservation/reservation";
import Doctor from "../Collections/Doctors/doctor";
import DoctorUpdate from "../Collections/Doctors/doctorsUpdate";
import Login from "../components/Login/login";
export default function Routes() {
    return (
        <Switch>
            <Route path={"/"} exact component={Login} />
            <Route path={"/login"} exact component={Login} />
            <PrivateRoute path={"/city"} exact component={City} />
            <PrivateRoute path={"/addCity"} exact component={CityUpdate} />
            <PrivateRoute path={"/updateCity/:id"} exact component={CityUpdate} />
            <PrivateRoute path={"/insurance"} exact component={Insurance} />
            <PrivateRoute path={"/addInsurance"} exact component={InsuranceUpdate} />
            <PrivateRoute path={"/updateInsurance/:id"} exact component={InsuranceUpdate} />
            <PrivateRoute path={"/users"} exact component={User} />
            <PrivateRoute path={"/doctors"} exact component={Doctor} />
            <PrivateRoute path={"/updateDoctor/:id"} exact component={DoctorUpdate} />
            <PrivateRoute path={"/addDoctor"} component={DoctorUpdate}/>
            <PrivateRoute path={"/reservation"} exact component={Reservation} />
        </Switch>
    )
}