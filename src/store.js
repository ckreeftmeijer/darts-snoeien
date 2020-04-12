import {
  applyMiddleware,
  createStore,
} from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers";


const enhancers = [applyMiddleware(thunk)];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__


export const store = createStore(
  reducers,
  {},
  composeEnhancers(...enhancers)
);
