// axios used for making ajax requests
import axios from 'axios';
// Import types
import { FETCH_USER } from './types';

// define action creator
const fetchUser = () => {
    // create function that makes a get request
    // only dispatches action when request has been completed
    return function (dispatch) {
        // pass in route
        axios
            .get('/auth/current_user')
            // when request has been completed and res populated from API
            // ready to dispatch action
            // define type of action& payload of the res recieved from API
            .then(res => dispatch({ type: FETCH_USER, payload: res }));
    }

};