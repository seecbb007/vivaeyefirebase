import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducer/rootReducer";
import { getFirestore } from "redux-firestore";
import { db } from "./firebase/config"; // make sure this path is correct

const middleware = [
  thunk.withExtraArgument({ getFirestore: () => getFirestore(db) }),
];

const composedEnhancers = composeWithDevTools(
  applyMiddleware(...middleware)
  // No need for reduxFirestore(firebase) since you are using Firebase v9+
);

const store = createStore(rootReducer, composedEnhancers);

export default store;
