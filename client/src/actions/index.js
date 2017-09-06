// axios used for making ajax requests
import axios from 'axios';
// Import types
import { FETCH_USER } from './types';

// define action creator
const fetchUser = () => {
    // make get request
    // pass in route
    axios.get('/auth/current_user');

};