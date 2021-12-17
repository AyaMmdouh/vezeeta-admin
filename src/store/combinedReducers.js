import { combineReducers } from "redux";
import citiesReducer from "./reducers/cities";
import cityReducer from "./reducers/city";
import cityIdReducer from "./reducers/cityid";
import authReducer from "./reducers/isAuth";
import loginReducer from "./reducers/login";
import regionsReducer from "./reducers/regions";
export default combineReducers({
    login: loginReducer,
    city:cityReducer,
    cityId: cityIdReducer,
    cities: citiesReducer,
    regions:regionsReducer,
    isAuth:authReducer,
})