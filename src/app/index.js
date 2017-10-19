import React from "react";
import {render} from "react-dom";
import {createStore, combineReducers, applyMiddleware} from "redux";
import {logger} from "redux-logger";
import App from "./components/App.js"
import {Provider} from "react-redux";

const mathReducer = (state = {
    result: 1,
    lastValues: []
}, action) => {
    switch (action.type) {
        case "ADD":
            state = {
                ...state,
                result: state.result + action.payload,
                lastValues: [...state.lastValues, action.payload]
            };
            break;
        case "SUBTRACT":
            state = {
                ...state,
                result: state.result - action.payload,
                lastValues: [...state.lastValues, action.payload]
            };
            break;
    }
    return state;
};

const userReducer = (state = {
    name: "Jarek",
    age: 27
}, action) => {
    switch (action.type) {
        case "SET_NAME":
            state = {
                ...state,
                name: action.payload
            };
            break;
        case "SET_AGE":
            state = {
                ...state,
                age: action.payload
            };
            break;
    }
    return state;
};

const myLogger = (store) => (next) => (action) => {
    console.log("Logged action: ", action);
    next(action);
};

const store = createStore(combineReducers({mathReducer, userReducer}),
    {},
    applyMiddleware(logger));

store.subscribe(() => {
    // console.log("Store updated! ", store.getState());
});

render(
    <Provider store={store}>
        <App />
    </Provider>,
    window.document.getElementById('app'));
