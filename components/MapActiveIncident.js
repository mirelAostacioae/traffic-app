import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import { Icon } from 'expo';
import TextItem from '../components/TextItem';
import IconWrap from '../components/IconWrap';
import incidents from '../constants/incidents';

export default MapActiveIncident = (props) => {
    const { incident, handleHideIncident, navigation } = props;
    return (
      <View style={styles.container}>
				<View style={styles.updateWrap}>
					<View style={styles.titleWrap}>
						<IconWrap
							severity={incident.severity}
							type={incident.type}
						/>
						<TextItem style={styles.title} weight='medium'>{incident.title ||  incidents[incident.type].name}</TextItem>
					</View>  
				</View>
				<View style={styles.updateWrap}>
					<TextItem style={styles.text} weight='medium'>Distance</TextItem>
					<TextItem style={styles.subtitle}>{incident.distance}km</TextItem>
				</View>
				<View style={styles.updateWrap}>
					<TextItem style={styles.text} weight='medium'>Last update</TextItem>
					<TextItem style={styles.subtitle}>{incident.registered}</TextItem>
				</View>
				<TouchableOpacity onPress={() => navigation.navigate('Incident', {incident})}><TextItem>Show Details</TextItem></TouchableOpacity>
				<View style={styles.hideDetails} onClick={this.handleHideIncident}>
					<TouchableOpacity onPress={handleHideIncident} style={styles.hideDetailsButton}>
						<Icon.FontAwesome
							raised
							name='angle-up'
							size={20}
							color='#222'
						/>
					</TouchableOpacity>
				</View>
			</View>
    )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 10,
    paddingTop: Platform.OS === 'ios' ? 28 : 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    zIndex: 1
  },
  titleWrap: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 5,
  },
  title: {
    flex: 1,
    marginLeft: 5,
    textTransform: 'capitalize',
    fontSize: 16,
  },
  subtitle: {
    fontSize: 12
  },
  text: {
    fontSize: 11
  },
  updateWrap: {
    marginBottom: 5
  },
  markerWrap: {
    borderWidth: 1
  },
  hideDetails: {
    flex: 1,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  hideDetailsButton: {
    padding: 10
  }
});

MapActiveIncident.propTypes = {
	incident: PropTypes.any,
	handleHideIncident: PropTypes.func
}

MapActiveIncident.defaultProps = {
	incident: {},
	handleHideIncident: () => {}
};