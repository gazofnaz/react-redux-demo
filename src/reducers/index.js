import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import numAjaxCallsInProgress from './ajaxStatusReducer';

/**
 * Apply all the reducers here, or something
 * Useful when we have more than one reducer.
 */
const rootReducer = combineReducers({
    // shorthand property names
    courses,
    authors,
    numAjaxCallsInProgress

});

export default rootReducer;