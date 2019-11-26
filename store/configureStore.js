import { applyMiddleware, createStore } from 'redux';
import axios from 'axios';
import ReduxThunk from 'redux-thunk';

import rootReducer from './rootReducer';
// import {API_URL} from '../config/serverConfig';

// axios.defaults.baseURL = API_URL

export default () => {
  let store = createStore(rootReducer, undefined, applyMiddleware(ReduxThunk))

  return { store }
}
