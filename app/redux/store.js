import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

const client = axios.create({
    baseURL: 'https://api.github.com',
    responseType: 'json'
});

const middlewares = [thunk, axiosMiddleware(client)];
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
