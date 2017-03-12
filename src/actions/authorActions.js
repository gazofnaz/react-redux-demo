import * as types from './actionTypes';
import AuthorApi from '../api/mockAuthorApi';

// In a full app this thunk will contain all the actions for CRUD operations

export function loadAuthorsSuccess(authors){
    return {
        type: types.LOAD_AUTHORS_SUCCESS,
        authors
    };
}

export function loadAuthors(){
    return function(dispatch) {
        return AuthorApi.getAllAuthors().then(authors => {
            dispatch(loadAuthorsSuccess(authors));
        }).catch(error => {
            throw(error);
        });
    };
}