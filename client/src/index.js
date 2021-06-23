import React from 'react';
import ReactDOM from 'react-dom';
import './common/resources/css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './app/App';
import {Provider} from "react-redux";
import store from "./app/store";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
