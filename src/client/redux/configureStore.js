import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/index';
import { rootReducer } from './reducers/rootReducer';
import thunk from 'redux-thunk';

let store;

export default function configureStore(initialState) {
    if (store) {
        return store;
    }

    store =
        process.env.NODE_ENV === 'production'
            ? createStore(rootReducer, initialState, compose(applyMiddleware(thunk)))
            : createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

    return store;
}
