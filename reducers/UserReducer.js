import {
	FETCH_INCIDENTS,
	FETCH_INCIDENTS_FAIL,
	FETCH_INCIDENTS_SUCCESS
} from '../actions/UserActions'

const INITIAL_STATE = {
	loadingIncidents: false,
	incidentsList: []
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
			case FETCH_INCIDENTS:
				return { ...state, loadingIncidents: true }
			case FETCH_INCIDENTS_SUCCESS:
				return { ...state, incidentsList: action.payload, loadingIncidents: false}
			case FETCH_INCIDENTS_FAIL:
				return { ...state, loadingIncidents: false, error: action.payload }
      default:
      	return state
    }
}