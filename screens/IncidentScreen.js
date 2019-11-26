import React from 'react';
import { StyleSheet, View, TouchableOpacity, Platform, ScrollView, Image, Dimensions, Linking } from 'react-native';
import { Icon } from 'expo';
import getDirections from 'react-native-google-maps-directions';
import TextItem from '../components/TextItem';
import IconWrap from '../components/IconWrap';
import IconTraffic from '../components/IconTraffic';
import colors from '../constants/colors';
import severities from '../constants/severity';
import incidents from '../constants/incidents';
const { width } = Dimensions.get('window');
const imageHeight = 140;

export default class IncidentScreen extends React.Component {
	static navigationOptions = {
    header: null,
	};

	handleDirections = () => {
		const { navigation, screenProps } = this.props;
		const incident = navigation.getParam('incident', {});
		const data = {
			destination: {
				latitude: parseFloat(incident.latitude),
				longitude: parseFloat(incident.longitude)
			},
			params: [
				{
					key: "travelmode",
					value: "driving"        // may be "walking", "bicycling" or "transit" as well
				},
				{
					key: "dir_action",
					value: "navigate"       // this instantly initializes navigation using the given travel mode
				}
			]
		}
		getDirections(data)

		// openMap({
		// 	end: 'Palas Iasi'
		// });
	}
	
  render() {
		const { navigation } = this.props;
		const incident = navigation.getParam('incident', {});
    return (
      <View style={styles.container}>
				<View style={[styles.flexContainer, styles.header]}>
					<TouchableOpacity 
						onPress={() => navigation.goBack()} 
					>
						<Icon.FontAwesome
							raised
							name='angle-left'
							size={30}
							color={colors.primaryColor}
							style={{padding: 5}}
						/>
					</TouchableOpacity>
					<View style={[styles.flexContainer, {paddingLeft: 10, flex: 1}]}>
						<IconWrap
							severity={incident.severity}
							type={incident.type}
							iconSize={23}
							large
						/>
						<TextItem style={{paddingLeft: 10, textTransform: 'capitalize'}} weight='medium'>{incident.title  || incidents[incident.type].name}</TextItem>
					</View>
				</View>
				<View style={styles.contentImage}>
					{incident.picture && <Image style={{ 'width': width, 'height': imageHeight }} source={{uri: incident.picture}} />}
					{!incident.picture && 
						<View>
							<View style={{width: '100%', height: imageHeight, backgroundColor: severities[incident.severity].bgColor, justifyContent: 'center', alignItems: 'center'}}>
								<IconTraffic
									name={incidents[incident.type].icon}
									color={severities[incident.severity].color}
									size={60}
								/>
							</View>
						</View>
					}
				</View>
				<View style={styles.contentDescr}>
					<View style={styles.contentItem}>
						<TextItem style={styles.text} weight='medium'>Distance</TextItem>
						<TextItem style={styles.subtitle}>{incident.distance} km</TextItem>
					</View>
					<View style={styles.contentItem}>
						<TextItem style={styles.text} weight='medium'>Last update</TextItem>
						<TextItem style={styles.subtitle}>{incident.registered}</TextItem>
					</View>
					<ScrollView style={{flex: 1}}>
						<TextItem style={styles.subtitle}>{incident.description}</TextItem>
					</ScrollView>
				</View>
				<View style={styles.actionsWrap}>
					<TouchableOpacity 
						style={styles.actionsItem}
						onPress={this.handleDirections}
					>
						<TextItem style={{color: colors.lightColor}}>Get Directions</TextItem>
					</TouchableOpacity>
					{incident.phoneNumber &&
						<TouchableOpacity 
							style={[styles.actionsItem, {backgroundColor: colors.errorColor}]}
							onPress={() => Linking.openURL(`tel:${incident.phoneNumber}`)}
						>
							<TextItem style={{color: colors.lightColor}}>Call</TextItem>
						</TouchableOpacity>
					}
				</View>
			</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
		paddingTop: Platform.OS === 'ios' ? 22 : 4
	},
	header: {
		paddingLeft: 10,
		paddingRight: 20,
		marginBottom: 10,
		flexDirection: 'row',
		alignItems: 'center',
	},
	flexContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	content: {
		flex: 1,
	},
	contentImage: {
		marginBottom: 10
	},
	contentDescr: {
		paddingHorizontal: 10,
		flex: 1,
	},
	contentItem: {
		marginBottom: 5
	},
	subtitle: {
    fontSize: 12
  },
  text: {
    fontSize: 11
	},
	actionsWrap: {
		flexDirection: 'row'
	},
	actionsItem: {
		flex: 1,
		padding: 20,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.primaryColor
	}
});
