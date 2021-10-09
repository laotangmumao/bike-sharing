import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import configureStore from './redux/store'
import IRouter from './router'
const store = configureStore()
ReactDOM.render(
    <Provider store={store}>
    <IRouter />
    </Provider>,
    document.getElementById('root')
    
)