import { combineReducers } from "redux";
import { authreducer } from "./authreducer";
import { productreducers } from "./productreducers";
import { reviewreducers } from "./reviewreducer";
export const rootReducer = combineReducers({
  auth: authreducer,
  prod: productreducers,
  rev: reviewreducers,
});
