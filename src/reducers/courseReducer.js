import * as types from '../actions/actionTypes';
import initialState from './initialState';

// Reducer takes current state and an action and returns the new state
export default function courseReducer(state = initialState.courses, action){
    switch (action.type){

        case types.LOAD_COURSES_SUCCESS:
            // state is immutable. so we can't do this:
            // state.push(action.courses);
            // return state;
            return action.courses;

        // Remember, state is immutable.
        case types.CREATE_COURSE_SUCCESS:
            return [
                ...state, // Spread operator explodes an array, as if it were completely typed out by hand
                Object.assign({}, action.course) // Create new copy of the course object to add to the state
            ];

        // can't just change the course in the state array
        case types.UPDATE_COURSE_SUCCESS:
            return [
                // filter gets a list of all courses except the course that's being updated
                ...state.filter(course => course.id !== action.course.id),
                Object.assign({}, action.course) // Add the 'new' course, which is actually updated
            ];

        default:
            return state;
    }

}