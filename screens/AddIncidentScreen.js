import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Image, LayoutAnimation, Alert } from 'react-native';
import { Permissions, ImagePicker } from 'expo'
import axios from 'axios';
import { Field, reduxForm } from 'redux-form';
import { connect } from "react-redux";
import {KeyboardEventListener} from '../components/KeyboardEvents'
import TextItem from '../components/TextItem';
import TextInputItem from '../components/form/TextInputItem';
import SelectItem from '../components/form/SelectItem';
import { formStyles } from '../components/form/formStyles';
import incidents from '../constants/incidents';
import severities from '../constants/severity';
import validate from '../components/form/addIncidentValidation';

class AddIncidentScreen extends Component {
	static navigationOptions = {
		title: 'Add Incident',
	};
	state = {
		image: null,
		type: null,
		keyboardHeight: 0
	}

	componentDidMount () {
    KeyboardEventListener.subscribe(({ keyboardHeight, layoutAnimationConfig }) => {
      LayoutAnimation.configureNext(layoutAnimationConfig)
      this.setState({ keyboardHeight })
    })
  }

  onSubmit = (values) => {
		const { image } = this.state;
		let newValues = values;
		const { screenProps } = this.props;
		const { currentLocation, getIncidents } = screenProps;
		// if (image) {
		// 	newValues = {
		// 		...values,
		// 		picture: this.state.image
		// 	}
		// }
		axios({
			method: 'post',
			headers:{
				'Content-Type': 'application/json',
				'Accept': 'application/json'},
			url: 'http://192.168.0.195:8086/api/traffic/incidents', // latitude=${location.latitude}&longitude=${location.longitude}&distance=3000`
			data: {
				...values,
				latitude: currentLocation.latitude,
				longitude: currentLocation.longitude
			}
			
    })
			.then((response) => {
				this.props.reset();
				Alert.alert(
					'Incident has been added!',
					'',
					[
						{text: 'OK', onPress: () => getIncidents()},
					],
					{cancelable: false},
				);
			})
			.catch((error) => {
				Alert.alert(
					'There was a problem while adding the incident! Please try again later!',
					'',
					[
						{text: 'OK', onPress: () => console.log('OK Pressed')},
					],
					{cancelable: false},
				);
			})
		
		KeyboardEventListener.removeKeyboard()
	}

	_pickImage = async () => {
		let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (status !== 'granted') {
      this.setState({
        image: 'Permission to access camera was denied'
      })
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1]
    })
    if (!result.cancelled) {
      this.setState({ image: result.uri })
    }
  }
  
  render() {
		const keyboardUp = this.state.keyboardHeight ? { height: this.state.keyboardHeight } : {}
		const { image } = this.state;
		const incidentsList = Object.keys(incidents).map(incident => {
			return (
				{
					value: incidents[incident].value, 
					label: incidents[incident].name
				}
			)
		});
		const severitiesList = Object.keys(severities).map(severity => {
			return (
				{
					value: severities[severity].value,
					label: severities[severity].name
				}
			)
		}); 

    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps={'handled'}>
				{/* <View style={formStyles.imageGroup}>
					<TouchableOpacity onPress={this._pickImage} >
						{!image && <Image source={require('../assets/images/new-image.png')} borderRadius={33} style={{ 'width': 66, 'height': 66 }} />}
						{image && <Image source={{uri: image}} borderRadius={33} style={{ 'width': 66, 'height': 66 }} />}
					</TouchableOpacity>
				</View> */}
				<View style={formStyles.fieldGroup}>
					<TextItem weight='medium' style={formStyles.label}>Title</TextItem>
					<Field
						name={'title'}
						placeholder={'Title'}
						component={TextInputItem}
					/>
				</View>
				<View style={formStyles.fieldGroup}>
					<TextItem weight='medium' style={formStyles.label}>Type</TextItem>
					<Field
						name={'type'}
						placeholder = {'Select type'}
						component={SelectItem}
						options={incidentsList}
					/>
				</View>
				<View style={formStyles.fieldGroup}>
					<TextItem weight='medium' style={formStyles.label}>Severity</TextItem>
					<Field
						name={'severity'}
						placeholder = {'Select severity'}
						component={SelectItem}
						options={severitiesList}
					/>
				</View>
				<View style={formStyles.fieldGroup}>
					<TextItem weight='medium' style={formStyles.label}>Phone Number</TextItem>
					<Field
						name={'phoneNumber'}
						placeholder={'Phone Number'}
						keyboardType='phone-pad'
						component={TextInputItem}
					/>
				</View>
				<View style={formStyles.fieldGroup}>
					<TextItem weight='medium' style={formStyles.label}>Description</TextItem>
					<Field
						name={'description'}
						placeholder={'Description'}
						multiline
						numberOfLines={4}
						component={TextInputItem}
					/>
				</View>
				
        <TouchableOpacity
					onPress={this.props.handleSubmit(this.onSubmit)}
					disabled={this.props.submitting}
          style={formStyles.button}
        >
					<TextItem weight='medium' style={formStyles.buttonText}>Confirm</TextItem>
				</TouchableOpacity>
				<View style={keyboardUp}/>
			</ScrollView>
    );
  }
}
const mapStateToProps = state => {
  let initValues = {};
  return {
    initialValues: initValues
  };
};
const form = reduxForm({
	form: 'addIncidentForm',
	validate,
	enableReinitialize: true
})(AddIncidentScreen);

export default connect(mapStateToProps)(form);

const styles = StyleSheet.create({
  container: {
		padding: 10,
    backgroundColor: '#ffffff',
	}
});