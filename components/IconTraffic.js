import React from 'react';
import PropTypes from 'prop-types';
import { createIconSetFromFontello } from '@expo/vector-icons';
import fontelloConfig from '../assets/fonts/config.json';
const IconTrafficFont = createIconSetFromFontello(fontelloConfig, 'TrafficIcon');
export default IconTraffic = (props) => {
    const { color, size, name } = props;
    return (
        <IconTrafficFont
            name={name}
            size={size}
            color={color}
        />
    )
}

IconTraffic.propTypes = {
	name: PropTypes.string,
	color: PropTypes.string,
	size: PropTypes.number
}

IconTraffic.defaultProps = {
	name: 'unknown',
	color: '#fff',
	size: 16
};