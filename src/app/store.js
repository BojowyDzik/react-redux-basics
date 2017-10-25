import {createStore, combineReducers, applyMiddleware} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware"

import mathReducer from "./reducers/mathReducer";
import userReducer from "./reducers/userReducer";

export default createStore(
    combineReducers({
        mathReducer,
        userReducer
    }),
    {},
    applyMiddleware(logger, thunk, promise())
);