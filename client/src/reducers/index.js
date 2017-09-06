import { combineReducers } from 'redux';
// import the authReducer
import authReducer from './authReducer';

// Place combinerReducers call and export it
export default combineReducers({
    // state: reducer
    auth: authReducer,
    // form: reduxForm,
    // surveys: surveysReducer
});