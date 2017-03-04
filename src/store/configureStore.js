import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

/**
 * Configure the store
 *
 * Invariant is good for something - think it enforces the immutability of the state.
 *
 * @param initialState
 * @returns {*}
 */
export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        // middleware is stuff that goes in the middle... or something
        applyMiddleware(thunk, reduxImmutableStateInvariant())
    );
}