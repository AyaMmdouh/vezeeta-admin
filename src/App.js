//import 'firebase/firestore';
//import 'firebase/auth';
import { Provider } from "react-redux";
import store from './store/store'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Routes from "./Routes/routes";
function App() {
  return (
    <>
      <Router>
        <Provider store={store}>
          <Routes/>
        </Provider>
      </Router>
    </>
  );
}

export default App;
