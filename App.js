import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Alert } from 'react-native';
import { AppLoading, Location, Permissions, Asset, Font, Icon } from 'expo';
import axios from 'axios';
import Constants from 'expo-constants';
import { Provider } from 'react-redux';
import moment from 'moment';
import configureStore from './store/configureStore';
import AppNavigator from './navigation/AppNavigator';
import incidentsData from './constants/data';
import getDistance from './utils/getDistance';
import getBoundingBox from './utils/getBoundingBox';
import degress2metres from './utils/degress2metres';

const {store} = configureStore();

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    currentLocation: null,
    deviceId: null,
    test: null,
    list: [],
    incidentsList: incidentsData
  };

  updateIncidentsList = (incidents) => {
    const updatedIncidents = [ ...this.state.incidentsList, ...incidents]
    // console.log(updatedIncidents);
    const list = updatedIncidents.map( incident => {
      const distance = getDistance(this.state.currentLocation, {latitude: incident.latitude, longitude: incident.longitude});
      if (incident.registered){
        registered = moment(parseInt(incident.registered)).format('MMMM Do YYYY, h:mm:ss a');
      }
      return {
        ...incident,
        lastUpdate: parseInt(incident.registered),
        registered, 
        distance}
    })
    this.setState({list})
  }

  getIncidents = () => {
    const {currentLocation} = this.state;
    const boundingBox = getBoundingBox([currentLocation.latitude, currentLocation.longitude], 10);
    const min = degress2metres(boundingBox[0], boundingBox[1]);
    const max = degress2metres(boundingBox[2], boundingBox[3]);
    axios.get(`http://192.168.0.155:8086/api/traffic/incidents?minLat=${min[1]}&&minLong=${min[0]}&&maxLat=${max[1]}&&maxLong=${min[0]}&&zoom=10`)
    .then((response) => {
      // handle success
      this.updateIncidentsList(response.data);
      // this.setState({list: response.data})
    })
    .catch((error) => {
      // handle error
      console.log('error', JSON.stringify(error));
    })
  }

  componentDidMount () {
    this.setState({deviceId: Constants.installationId})
    this._getLocationAsync();
    setInterval(() => {
      this.getIncidents()
    }, 1000000000);
    navigator.geolocation.watchPosition(
      (position) => {
        this.setState({ currentLocation: {latitude: position.coords.latitude, longitude: position.coords.longitude}})
          this.getIncidents()
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 1000, maximumAge: 1000 },
    );
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      this.setState({
        currentLocation: 'Permission to access location was denied'
      })
    }
    let location = await Location.getCurrentPositionAsync({})
    this.setState({ currentLocation: {latitude: location.coords.latitude, longitude: location.coords.longitude} })
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <View style={styles.container}>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <AppNavigator 
                screenProps={{
                  deviceId: this.state.deviceId,
                  incidentsData: this.state.list || this.state.incidentsList,
                  getIncidents: this.getIncidents,
                  currentLocation: this.state.currentLocation
                }}
              />
            </View>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        // require('./assets/images/robot-dev.png'),
      ]),
      Font.loadAsync({
        ...Icon.Ionicons.font,
        'Firasans': require('./assets/fonts/FiraSans/FiraSans-Regular.ttf'),
        'Firasans-medium': require('./assets/fonts/FiraSans/FiraSans-Medium.ttf'),
        'Firasans-bold': require('./assets/fonts/FiraSans/FiraSans-Bold.ttf'),
        'TrafficIcon': require('./assets/fonts/traffic.ttf'),
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
