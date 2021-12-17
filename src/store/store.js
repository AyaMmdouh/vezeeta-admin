import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";
import combinedReducers from "./combinedReducers";
const store = createStore(combinedReducers, composeWithDevTools(applyMiddleware(thunk)));
export default store;