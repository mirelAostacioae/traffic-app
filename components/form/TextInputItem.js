import React from 'react';
import { View, TextInput, Platform } from 'react-native';
import TextItem from '../TextItem';
import { formStyles, inputStyles } from './formStyles';
export default class MyTextInput extends React.Component {
  render () {
    const {input, type, meta: { touched, error }, ...inputProps} = this.props
    
    return (
      <View style={formStyles.itemContainer}>
        <TextInput
          {...inputProps}
          underlineColorAndroid='transparent'
          secureTextEntry={type === 'password'}
          onChangeText={input.onChange}
					value={input.value}
					returnKeyType='done'
					blurOnSubmit
          style={
						Platform.OS === 'ios'
              ? inputStyles.inputIOS
              : inputStyles.inputAndroid
					}
        />
        {touched && error && <TextItem style={formStyles.errorMessage}>{error}</TextItem>}
      </View>
    )
  }
}
