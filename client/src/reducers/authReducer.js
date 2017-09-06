// import { FETCH_USER } from '../actions/types';

// 1st Argument, state object responsible for this reducer
// 2nd Argument, action object 
export default function (state = null, action) {
    // Switch over the actions type
    switch (action.type) {
        //     case FETCH_USER:
        //         return action.payload || false;
        default:
            // If no action, no change in state is necessary
            return state;
    }
}