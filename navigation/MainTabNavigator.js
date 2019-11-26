import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import AddIncidentScreen from '../screens/AddIncidentScreen';
import SettingsScreen from '../screens/SettingsScreen';
import IncidentScreen from '../screens/IncidentScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Incident: IncidentScreen,
});

const tabBarOptions = {activeTintColor:'#3ee093'};

HomeStack.navigationOptions = ({navigation}) =>{ 
  let tabBarVisible = true;
  if (navigation.state.index > 0 && navigation.state.routes[1].routeName === "Incident") {
    tabBarVisible = false;
  }
  return {
    tabBarLabel: 'Incidents',
    tabBarVisible,
    tabBarOptions,
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === 'ios'
            ? 'ios-list'
            : 'md-list'
        }
      />
    ),
};
}

const MapStack = createStackNavigator({
  Map: MapScreen,
  Incident: IncidentScreen,
});

MapStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0 && navigation.state.routes[1].routeName === "Incident") {
    tabBarVisible = false;
  }
  return {
    tabBarLabel: 'Discover',
    tabBarVisible,
    tabBarOptions,
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-globe' : 'md-globe'}
      />
    ),
  };
}

const AddIncidentStack = createStackNavigator({
  AddIncident: AddIncidentScreen,
});

AddIncidentStack.navigationOptions = {
  tabBarLabel: 'Add Incident',
  tabBarOptions,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-add-circle-outline' : 'md-add-circle-outline'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarOptions,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'}
    />
  ),
};

const IncidentStack = createStackNavigator({
  Incident: IncidentScreen,
});

IncidentStack.navigationOptions = {
  tabBar: {
    visible: false
  },
  tabBarLabel: 'Incident',
  tabBarOptions,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  MapStack,
  AddIncidentStack,
  SettingsStack
});
