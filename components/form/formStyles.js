import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';
export const formStyles = StyleSheet.create({
	fieldGroup: {
		marginBottom: 24
	},
	imageGroup: {
		marginHorizontal: 5,
		alignItems: 'center'
	},
	label: {
		fontSize: 15
	},
	itemContainer: {
		width: '100%'
	},
	errorMessage: {
		position: 'absolute',
		top: '100%',
		left: 0,
		color: colors.errorColor,
		fontSize: 10
	},
	button: {
		height: 42,
		marginTop: 10,
		marginBottom: 15,
		backgroundColor: colors.primaryColor,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		color: colors.lightColor,
		textTransform: 'uppercase',
		fontSize: 15
	}
})
export const inputStyles = StyleSheet.create({
	inputIOS: {
		fontSize: 14,
		paddingVertical: 10,
		paddingHorizontal: 5,
		borderBottomWidth: 1,
		borderColor: colors.defaultColor,
		color: colors.textColor,
	},
	inputAndroid: {
		fontSize: 14,
		paddingHorizontal: 5,
		paddingVertical: 10,
		borderBottomWidth: 0.5,
		borderColor: colors.defaultColor,
		color: colors.textColor,
	},
});
  