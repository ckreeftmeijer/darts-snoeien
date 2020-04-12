import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

import App from './App';
import * as serviceWorker from './serviceWorker';

const socket = io();
// sockets test
socket.on('hello', ({ message }) => alert(message));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
