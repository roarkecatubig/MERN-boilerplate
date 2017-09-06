// import action type
import { FETCH_USER } from '../actions/types';

// 1st Argument, state object responsible for this reducer, 
// default to null to avoid UI elements changing during action if request takes longer than page load
// 2nd Argument, action object 
export default function (state = null, action) {
    // Switch over the actions type
    switch (action.type) {
        // if there is a type of FETCH_USER
        // user is logged in, return user model
        // or false if payload is empty
        case FETCH_USER:
            return action.payload || false;
        default:
            // If no action, no change in state is necessary
            // Intially null as set above
            return state;
    }
}