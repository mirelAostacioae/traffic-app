import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import TextItem from '../components/TextItem';
import colors from '../constants/colors';
export default FilterButton = (props) => {
	const { handlePress, title, type, active } = props;
	return (
			<TouchableOpacity 
				onPress={() => handlePress(type)} 
				style={[styles.item, active && styles.itemActive]}
			>
				<TextItem 
					style={[styles.itemText, active && styles.itemTextActive]}
				>
					{title}
				</TextItem>
			</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
  item: {
    marginRight: 10,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 20
  },
  itemText: {
    color: colors.textColor,
    fontSize: 14
  },
  itemActive: {
    backgroundColor: colors.primaryColor
  },
  itemTextActive: {
    color: colors.lightColor
  }
});

FilterButton.propTypes = {
    handlePress: PropTypes.func,
    title: PropTypes.string,
    type: PropTypes.string,
    active: PropTypes.bool
}

FilterButton.defaultProps = {
	handlePress: () => {},
	title: 'All',
	type: 'all',
	active: false
};