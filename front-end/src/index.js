//import ReactDOM from 'react-dom/client';
//import './index.css';
//import reportWebVitals from './reportWebVitals';

/*
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/



import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
//import registerServiceWorker from "./registerServiceWorker";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
//import configureStore from 'redux';
//import legacy_createStore from 'redux';
import { Provider } from "react-redux";
//import { composeWithDevTools } from 'redux-devtools-extension'; // Import composeWithDevTools from redux-devtools-extension
import { thunk } from "redux-thunk";

import tasksReducer from "./store/reducers/tasks";
import authReducer from "./store/reducers/auth";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: tasksReducer
});

//const store = configureStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
//const store = configureStore(rootReducer, composeEnhances(applyMiddleware(thunk)));
//const store = legacy_createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));
const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

//ReactDOM.render(app, document.getElementById("root"));
//registerServiceWorker();





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(app);
