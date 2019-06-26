// npm install -g json-server
// npm install --save axios redux react-redux
// npm install --save bootstrap
// npm install --save redux-logger

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';  //dari node_modules

import App from './components/App';
import reducers from './reducers/index';

const STORE = createStore(reducers, applyMiddleware(thunk,logger))

ReactDOM.render( 

    <Provider store={STORE}>
        <App/>
    </Provider>,
    document.getElementById('root')
)