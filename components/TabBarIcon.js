import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'expo';

export default TabBarIcon = (props) => {
    const { style, name, size, color, focused } = props;
    return (
      <Icon.Ionicons
        name={name}
        size={size}
        style={[style, { marginBottom: -3 }]}
        color={focused ? '#3ee093' : color}
      />
    )
}

TabBarIcon.propTypes = {
  style: PropTypes.any,
	name: PropTypes.string,
	color: PropTypes.string,
  size: PropTypes.number,
  focused: PropTypes.bool
}

TabBarIcon.defaultProps = {
  style: {},
	name: '',
	color: '#ccc',
  size: 26,
  focused: false
};