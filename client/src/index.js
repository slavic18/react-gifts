'use strict';
import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import io from 'socket.io-client';
import App from './components/App';
import {SocketProvider} from 'socket.io-react';
import { Provider } from "react-redux";
import { store } from "./store.js";


let host = window.location.hostname == 'localhost' ? 'http://localhost:8080' : 'https://chatclient.leadia.ru';
// let socket = io(host, {'reconnection': true, 'reconnectionDelay': 500, 'maxReconnectionAttempts': Infinity});
console.log(host);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODliMDgzNzcxZTMxMzQ0OGEwMDAwMDIiLCJyb2xlIjoiYWRtaW5pc3RyYXRvciIsInN0YXR1cyI6ImZhbHNlIiwibmFtZSI6InJlYWN0QWRtaW4iLCJwYXNzd29yZCI6IiQyYSQxMCRzSWUwbmJXNXh4UzdTOUM4elNLOUV1YXV4NklhaDE3VTQ3dUVIMW54QURFT3YxTWlzWXpMQyIsImxvZ2luIjoicmVhY3RBZG1pbiIsIl9fdiI6MCwicHJvamVjdF9pZHMiOltdLCJvbmxpbmUiOmZhbHNlLCJpYXQiOjE0ODY1NTUyMjEsImV4cCI6MTgwMjEzMTIyMX0.3mCIX1KlBNyZrDVF5g-S-wSeVSbXINqIq-EzwN7gBMo';

const socket = io.connect(host, {
    'reconnection': true,
    'reconnectionDelay': 500,
    'maxReconnectionAttempts': Infinity,
    'query': 'token=' + token,
});

// render the main component
ReactDOM.render(
    <Provider store={store}>
        <SocketProvider socket={socket}>
            <App/>
        </SocketProvider>
    </Provider>,
    document.getElementById('app')
);
