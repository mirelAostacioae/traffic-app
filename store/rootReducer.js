import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import UserReducer from '../reducers/UserReducer';
export default combineReducers({
	form: formReducer,
	userReducer: UserReducer,
});