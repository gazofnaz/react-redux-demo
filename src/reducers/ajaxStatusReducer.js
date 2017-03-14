import * as types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * Personally I would prefer an END_AJAX_CALL option, because
 * it would allow for cheating later on and doesn't rely on other devs
 * matching convention.
 *
 * @param type
 * @returns {boolean}
 */
function actionTypeEndsInSuccess(type){
    return type.substring(type.length - 8) == '_SUCCESS';
}

export default function ajaxStatusReducer(state = initialState.numAjaxCallsInProgress, action){

    // simpler reducer can use ifs instead of switch
    if(action.type == types.BEGIN_AJAX_CALL) {
        return state + 1;
    }
    // A risky assumption based on the convention of using "success" for all our ajax calls
    // Added check for action type of error, in case we catch an error from the api
    else if( action.type == types.AJAX_CALL_ERROR ||
        actionTypeEndsInSuccess(action.type)){
        return state - 1;
    }

    return state;
}