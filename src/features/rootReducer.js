import { combineReducers } from "redux";
import gameState from "./meme/memeReducer";
import usersState from "./users/UsersReducer";

export default combineReducers({
  gameState,
  usersState
});
