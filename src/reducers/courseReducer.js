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
        default:
            return state;
    }

}