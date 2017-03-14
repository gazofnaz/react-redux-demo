import * as types from './actionTypes';
import AuthorApi from '../api/mockAuthorApi';
import {beginAjaxCall} from './ajaxStatusActions';

// In a full app this thunk will contain all the actions for CRUD operations

export function loadAuthorsSuccess(authors){
    return {
        type: types.LOAD_AUTHORS_SUCCESS,
        authors
    };
}

export function loadAuthors(){
    return function(dispatch) {

        // Tell the world that we have started an ajax action
        dispatch(beginAjaxCall());

        return AuthorApi.getAllAuthors().then(authors => {
            dispatch(loadAuthorsSuccess(authors));
        }).catch(error => {
            throw(error);
        });
    };
}