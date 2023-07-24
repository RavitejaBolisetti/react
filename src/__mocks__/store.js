import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from 'store/reducers';

export const createMockStore = (initialState) => {
    const mockStore = createStore(rootReducer, initialState, applyMiddleware(thunk));
    return mockStore;
}

export default createMockStore;


