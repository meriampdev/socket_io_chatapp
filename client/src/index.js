import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import rootReducer from './redux';

let socket = io();
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");


let store = applyMiddleware(socketIoMiddleware)(createStore)(rootReducer);
store.subscribe(()=>{
  // console.log('new client state', store.getState());
});
// store.dispatch({type:'server/hello', data:'Hello!'});


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
