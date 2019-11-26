import axios from 'axios';
export const FETCH_INCIDENTS = 'fetch_incidents'
export const FETCH_INCIDENTS_SUCCESS = 'fetch_incidents_success'
export const FETCH_INCIDENTS_FAIL = 'fetch_incidents_fail'
export const fetchIncidents = (location) => {
	return (dispatch) => {
		dispatch({type: FETCH_INCIDENTS})
		axios({
			method: 'get',
			url: `/incidents?latitude=${location.latitude}&longitude=${location.longitude}&distance=3000`
		})
			.then((response) => {
				dispatch({
					type: FETCH_INCIDENTS_SUCCESS,
					payload: response.data
				})
			}
			)
			.catch((error) => dispatch({
				type: FETCH_INCIDENTS_FAIL,
				payload: error.response
			}))
	}
}