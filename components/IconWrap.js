import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import IconTraffic from './IconTraffic';
import incidentTypes from '../constants/incidents';
import severities from '../constants/severity';
export default IconWrap = (props) => {
    const { style, large, highlighted, color, iconSize, type, severity } = props;
    return (
      <View
        style={[
          styles.container, 
          style, 
          large && styles.containerLarge,
          highlighted && styles.containerHighlighted,
          {backgroundColor: severities[severity].color}]}
      >
        <IconTraffic
          name={incidentTypes[type].icon}
          size={iconSize}
          color={color}
        />
      </View>
    )
}
const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    borderRadius: 12,
    paddingLeft: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,87,51,1)'
  },
  containerLarge: {
    width: 32,
    height: 32,
    borderRadius: 16
  },
  containerHighlighted: {
    borderWidth: 2,
    borderColor: '#3ee093'
  }
  
})

IconWrap.propTypes = {
  style: PropTypes.any,
  color: PropTypes.string,
  iconSize: PropTypes.number,
  type: PropTypes.string,
  severity: PropTypes.string,
  large: PropTypes.bool,
  highlighted: PropTypes.bool
}

IconWrap.defaultProps = {
  style: {},
  color: '#fff',
  iconSize: 18,
  type: 'UNKNOWN',
  severity: 'UNKNOWN',
  large: false,
  highlighted: false
};