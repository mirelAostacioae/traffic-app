import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { MapView, Icon } from 'expo';
import { NavigationEvents } from 'react-navigation';
import IconWrap from '../components/IconWrap';
import MapActiveIncident from '../components/MapActiveIncident';
const LATITUDE_DELTA = .004;
const LONGITUDE_DELTA = .001;
export default class LinksScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    incidentsList: [],
    initialRenderMarkers: true,
    currentLocation: null,
    userLocation: null,
    activeIncident: null
  }

  componentDidMount () {
    const { screenProps } = this.props;
    const { incidentsData, currentLocation } = screenProps;
    this.setState({
      incidentsList: incidentsData, 
      currentLocation,
      userLocation: currentLocation
    })
  }

  componentDidUpdate (prevProps) {
    const { screenProps } = this.props;
    const { incidentsData, currentLocation } = screenProps;
    if (screenProps && incidentsData !== prevProps.screenProps.incidentsData) {
      this.setState({incidentsList: incidentsData})
    }
    if (screenProps && currentLocation !== prevProps.screenProps.currentLocation) {
      this.setState({currentLocation, userLocation: currentLocation})
    }
  }

  handleHideIncident = () => {
    this.setState({activeIncident: null})
  }

  recenterMap = () => {
    const { latitude, longitude } = this.state.userLocation;
    this.map.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    })
    this.handleHideIncident();
  }

  render() {
    const {incidentsList, userLocation, currentLocation, activeIncident} = this.state;
    if(!currentLocation || !userLocation) return(<React.Fragment></React.Fragment>)
    return (
      <View style={styles.container}>
          <NavigationEvents
            onDidBlur={payload => {
              this.recenterMap();
            }}
          />
          {activeIncident &&
            <MapActiveIncident
              incident={activeIncident}
              handleHideIncident={this.handleHideIncident}
              navigation={this.props.navigation}
            />
          }
          <MapView
              ref={map => {this.map = map}}
              style={{ flex: 1, alignSelf: 'stretch' }}
              region={{latitude: parseFloat(currentLocation.latitude), longitude: parseFloat(currentLocation.longitude), latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA}}
              moveOnMarkerPress={false}
              onRegionChange={this._handleMapRegionChange}
              loadingEnabled={true}
              >
                <MapView.Marker
                  coordinate={{latitude: parseFloat(userLocation.latitude), longitude: parseFloat(userLocation.longitude)}}
                >
                  <View style={styles.userLocation}></View>
                </MapView.Marker>
                {incidentsList.map(incident => {
                  let isSelected = false;
                  if (activeIncident) isSelected = activeIncident.id === incident.id;
                  return (
                    <MapView.Marker
                      key={`${incident.latitude}+${incident.longitude}+${incident.id}`}
                      coordinate={{latitude: parseFloat(incident.latitude), longitude: parseFloat(incident.longitude)}}
                      onPress={() => {
                        this.setState(
                          {activeIncident: incident, 
                            currentLocation: {...this.state.currentLocation, latitude: incident.latitude, longitude: incident.longitude}});
                      }}
                      >
                        <IconWrap
                          severity={incident.severity}
                          type={incident.type}
                          large={isSelected}
                          highlighted={isSelected}
                        />
                    </MapView.Marker>
                  )}
                )}
          </MapView>
          <TouchableOpacity onPress={this.recenterMap} style={styles.recenterMap}>
            <Icon.Ionicons
              name='ios-locate'
              size={32}
              color='#ccc'
            />
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  mapWrap: {
    flex: 1
  },
  userLocation: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#fff',
    backgroundColor: 'blue'
  },
  recenterMap: {
    position: 'absolute',
    bottom: 10,
    right: 10
  }
});
