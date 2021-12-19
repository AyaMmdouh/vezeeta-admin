import {useSelector } from "react-redux";
import {
  BrowserRouter as Router
} from "react-router-dom";
import Routes from "./Routes/routes";
import NavbarComponent from "./Navbar/navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
function App() {
  const isAuth = useSelector(state=>state.isAuth.isAuth);
  return (
    <>
      <Router>
        {isAuth && <NavbarComponent />}
        <Routes />
      </Router>
    </>
  );
}

export default App;
