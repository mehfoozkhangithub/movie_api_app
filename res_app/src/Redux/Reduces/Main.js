import { combineReducers } from "redux";
import { cartReducer } from "./Reducer";

const rooted = combineReducers({
  cart: cartReducer,
});

export default rooted;
