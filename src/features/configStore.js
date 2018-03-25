//Redux
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";

//Middleware
import thunk from "redux-thunk";
const middleware = [thunk];

//Create Store
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(...middleware));

export { store };
