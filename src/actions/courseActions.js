import * as types from './actionTypes';

// This is an action.
// It's called by the dispatcher and is handled by the reducer
export function createCourse(course){
    return {
        type: types.CREATE_COURSE,
        // in ES6 this means course: course. Sugaaaa
        course
    };
}