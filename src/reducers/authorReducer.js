import * as types from '../actions/actionTypes';
import initialState from './initialState';

// Reducer takes current state and an action and returns the new state
export default function authorReducer(state = initialState.authors, action){
    switch (action.type){
        case types.LOAD_AUTHORS_SUCCESS:
            return action.authors;
        default:
            return state;
    }
}