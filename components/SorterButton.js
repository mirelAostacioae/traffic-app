import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Platform } from 'react-native';
import { Icon } from 'expo';
import colors from '../constants/colors';
export default SorterButton = (props) => {
	const { handlePress, name, type, active } = props;
	return (
		<TouchableOpacity 
			onPress={() => handlePress(type)} 
		>
			<Icon.Ionicons
				name={
					Platform.OS === 'ios'
					? `ios-${name}`
					: `md-${name}`
				}
				size={21}
				style={{padding: 5}}
				color={active === type ? colors.primaryColor : colors.defaultColor}
			/>
		</TouchableOpacity>
	)
}
SorterButton.propTypes = {
	handlePress: PropTypes.func,
	name: PropTypes.string,
	type: PropTypes.string,
	active: PropTypes.string
}

SorterButton.defaultProps = {
	handlePress: () => {},
	name: '',
	type: '',
	active: ''
};