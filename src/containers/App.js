import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

import { createSwitchNavigator, createBottomTabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'

import LoginScreen from './LoginScreen';
import SplashScreen from './SplashScreen';
import HomeScreen from './HomeScreen';
import TabMenu from './TabMenu';
import TabOrder from './TabOrder';
import TabHistory from './TabHistory';
import TabInfo from './TabInfo';
import { primaryColorGreen } from '../styles';

const BottomTabNavigator = createBottomTabNavigator({
  Menu: TabMenu,
  Order: TabOrder,
  History: TabHistory,
  Info: TabInfo
},
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Menu') {
          iconName = `cutlery`;
        } else if (routeName === 'Order') {
          iconName = `shopping-cart`;
        } else if (routeName === 'History') {
          iconName = `history`;
        } else if (routeName === 'Info') {
          iconName = `info-circle`;
        }

        return <Icon name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: primaryColorGreen,
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: 'white'
      }
    },
  })

const SwitchNavigation = createSwitchNavigator({
  SplashScreen: SplashScreen,
  LoginScreen: LoginScreen,
  HomeScreen: BottomTabNavigator
})

class App extends Component {
  state = {}
  render() {
    return (
      <SwitchNavigation />
    );
  }
}

export default App;