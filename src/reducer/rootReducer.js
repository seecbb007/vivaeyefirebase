import { combineReducers } from "redux";

import productsReducer from "./productsReducer";
import loginReducer from "./loginReducer";
import shoppingCartReducer from "./shoppingCartReducer";
import firebaseReducer from "./firebaseReducer";

const rootReducer = combineReducers({
  productsReducer,
  loginReducer,
  shoppingCartReducer,
  firebaseReducer,
});

export default rootReducer;
