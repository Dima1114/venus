import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import configureStore from "./store";
import Root from "./roots/Root";
import WebFont from 'webfontloader';

WebFont.load({
    google: {
        families: ['Indie Flower:400,300,500:latin']
    }
});

const store = configureStore();
ReactDOM.render(
    <Root store={store}/>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
