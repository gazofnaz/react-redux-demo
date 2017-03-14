import * as types from './actionTypes';
import CourseApi from '../api/mockCourseApi';

// This is an action.
// It's called by the dispatcher and is handled by the reducer
export function loadCoursesSuccess(courses){
    return {
        type: types.LOAD_COURSES_SUCCESS,
        // in ES6 this means courses: courses. Sugaaaa
        courses
    };
}

export function createCourseSuccess(course){
    return {
        type: types.CREATE_COURSE_SUCCESS,
        course
    };
}

export function updateCourseSuccess(course){
    return {
        type: types.UPDATE_COURSE_SUCCESS,
        course
    };
}

// This is a thunk. It fetches data from the api
export function loadCourses(){
    return function(dispatch) {
        // returns a promise
        // anonymous call after success
        return CourseApi.getAllCourses().then(courses => {
            dispatch(loadCoursesSuccess(courses));
        }).catch(error => {
            throw(error);
        });
    };
}

// Thunk to save a course
export function saveCourse(course){
    // The store can be accessed here if needed, rather than pass things in.
    return function(dispatch, getState) {
        return CourseApi.saveCourse(course).then(savedCourse => {
            // If the course already has an id, update it. Otherwise create as new.
            course.id ? dispatch(updateCourseSuccess(savedCourse)):
                        dispatch(createCourseSuccess(savedCourse));
        }).catch(error => {
            throw(error);
        });
    };
}