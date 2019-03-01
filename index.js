/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import './shim';

import {AppRegistry} from 'react-native';
import React, {Component} from 'react';
import App from './app/App';
import {name as appName} from './app.json';
import { YellowBox } from 'react-native';
import {Provider} from 'react-redux';
import store from './app/redux/store';


const PhantomWalletApp = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>        
    )
}

AppRegistry.registerComponent(appName, () => PhantomWalletApp);
YellowBox.ignoreWarnings(['Remote debugger']);