import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

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
        applyMiddleware(reduxImmutableStateInvariant())
    );
}