import React from 'react';
import { StyleSheet, View, TouchableOpacity, Slider } from 'react-native';
import colors from '../constants/colors';
import TextItem from '../components/TextItem';
export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
	};
	static defaultProps = {
    range: 1,
  };
  state = {
		range: this.props.range
	}

  render() {
    return (
      <View style={styles.container}>
				<TextItem weight='medium'>Range</TextItem>
				<View style={styles.sliderWrap}>
					<Slider
						style={{width: 200, height: 40}}
						minimumValue={1}
						maximumValue={20}
						step={1}
						minimumTrackTintColor={colors.primaryColor}
						maximumTrackTintColor={colors.defaultColor}
						value={this.state.value}
						onValueChange={range => this.setState({range})}
					/>
					<TextItem style={{marginLeft: 10}}>{this.state.range} km</TextItem>
				</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    padding: 10
	},
	sliderWrap: {
		flexDirection: 'row',
		alignItems: 'center',
	}
});
