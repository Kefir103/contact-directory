import React from 'react';
import ReactDOM from 'react-dom';
import '../../public/styles.css';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import { initialState } from './redux/initialState';
import App from './App';

const store = configureStore(initialState);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
