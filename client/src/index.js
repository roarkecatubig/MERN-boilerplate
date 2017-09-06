// Primary setup for all things redux inside application, render route component to DOM
// Import materialize css
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
// Import Provider tag
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// Import App component
import App from './components/App';
// Import all reducers
import reducers from './reducers';

// Use createStore helper to to create new instance of redux store
// Arguments in createStore are all the reducers in application
const store = createStore(reducers, {}, applyMiddleware());

// 1st argument = route component
// 2nd argument = where we want to render that component to inside of DOM
// #root found in public/index.html
ReactDOM.render(<Provider store={store}><App /></Provider>, document.querySelector('#root'));
