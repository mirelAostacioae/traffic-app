import React from 'react';
import { Text } from 'react-native';
export default (props) => {
	const { weight, style, children } = props;
	let fontFamily = 'Firasans';
	if(weight === 'bold'){
		fontFamily = 'Firasans-bold';
	} else if(weight === 'medium'){
		fontFamily = 'Firasans-medium';
	}
	return (
		<Text {...props} style={[{ fontFamily, color: '#364153' }, style]}>
			{children}
		</Text>
	)
}