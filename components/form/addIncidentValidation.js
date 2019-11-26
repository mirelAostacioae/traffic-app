const HELP = 14;
export default values => {
	const errors = {}
	if (!values.type) {
		errors.type = 'Required'
	}
	
	if (!values.severity) {
		errors.severity = 'Required'
	}

	if (values.type === HELP && !values.phoneNumber) {
		errors.phoneNumber = 'Required'
	}

	return errors
}