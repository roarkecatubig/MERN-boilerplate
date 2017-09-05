// Primary setup for all things redux inside application, render route component to DOM
import React from 'react';
import ReactDOM from 'react-dom';
// Import App component
import App from './components/App';

// 1st argument = route component
// 2nd argument = where we want to render that component to inside of DOM
ReactDOM.render(<App />, document.querySelector('#root'));
