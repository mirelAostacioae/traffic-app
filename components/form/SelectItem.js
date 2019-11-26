import React from 'react'
import { View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import TextItem from '../TextItem';
import { formStyles, inputStyles } from './formStyles';
import colors from '../../constants/colors';

export default class SelectItem extends React.Component {
  render () {
		const {input, placeholder, options, meta: { touched, error }, ...inputProps} = this.props
    return (
      <View style={formStyles.itemContainer}>
        <RNPickerSelect
					placeholder={{
						label: placeholder,
						value: null,
						color: colors.defaultColor
					}}
					{...inputProps}
					items={options}
					onValueChange={input.onChange}
					style={inputStyles}
					value={input.value}
        />
				{touched && error && <TextItem style={formStyles.errorMessage}>{error}</TextItem>}
      </View>
    )
  }
}