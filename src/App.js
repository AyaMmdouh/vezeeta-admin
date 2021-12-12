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
function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route path={"/"} exact component={City}></Route>
        <Route path={"/addCity"} exact component={CityUpdate}></Route>
        <Route path={"/updateCity/:id"} exact component={CityUpdate}></Route>
      </Switch>
     </Router>
    </>
  );
}

export default App;
