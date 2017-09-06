// axios used for making ajax requests
import axios from 'axios';
// Import types
import { FETCH_USER } from './types';

// define action creator
// only dispatches action when request has been completed
export const fetchUser = () => async dispatch => {
    // use axios to make API request async await to generate promise
    const res = await axios.get('/auth/current_user');
    // ready to dispatch action
    // define type of action& payload of the res recieved from API
    dispatch({ type: FETCH_USER, payload: res.data });
};