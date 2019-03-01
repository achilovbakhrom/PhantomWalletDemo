import React, {Component} from 'react';
import {createStackNavigator, createMaterialTopTabNavigator, createAppContainer} from 'react-navigation';
import Main from './containers/main';
import Transaction from './containers/transactions';

const TabNavigator = createMaterialTopTabNavigator({
    Main: Main, 
    Transaction: Transaction
}, {
    tabBarOptions: {
        labelStyle: {
          fontSize: 12,
          color: 'black'
        },        
        style: {
          backgroundColor: 'white',
        },
        indicatorStyle: {
            backgroundColor: 'gray'
        }
      }
});

TabNavigator.navigationOptions = {
    title: 'Phantom Wallet'
}
const App = createStackNavigator({
    MainApp: {
        screen: TabNavigator
    }
});

export default createAppContainer(App);