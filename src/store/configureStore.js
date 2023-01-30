// This file has been made based on the redux docs for configuring store https://redux.js.org/recipes/configuring-your-store
// Additionally support for dev tools has been added using the npm package. Read here: https://github.com/zalmoxisus/redux-devtools-extension
import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";
import { rootReducer } from "./reducers";

export const configureStore = (initialState) => {
  const middlewares = [thunk];

  const enhancers = [];
  let composeFn = compose;

  if (process.env.NODE_ENV !== "production") {
    composeFn = composeWithDevTools({
      name: "DMS 2.0 Frontend App",
      trace: false,
    });
  }

  const composeEnhancers = composeFn(
    applyMiddleware(...middlewares),
    ...enhancers
  );

  const store = createStore(rootReducer, initialState, composeEnhancers);

  return store;
};
