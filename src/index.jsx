import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux';
import { store } from './_helpers';
import * as serviceWorker from './serviceWorker';
import { App } from './App';

ReactDOM.render(
    (<Provider store={store}>
        <App />
    </Provider>),
    document.getElementById('root') || document.createElement('div')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
