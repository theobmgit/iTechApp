import React from 'react';
import ReactDOM from 'react-dom';
import './common/resources/css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './app/App';
import {Provider} from "react-redux";
import {persistor, store} from "./app/store";
import {PersistGate} from "redux-persist/integration/react";

class LoadingView extends React.Component {
    render() {
        return (
            <h2>Loading</h2>
        )
    }
}
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={<LoadingView/>} persistor={persistor}>
                <App/>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
