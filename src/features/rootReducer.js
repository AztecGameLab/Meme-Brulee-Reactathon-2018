import { combineReducers } from "redux";
import gameState from "./meme/memeReducer";
import usersState from "./users/UsersReducer";
import sessionState from "./session/sessionReducer";

export default combineReducers({
  gameState,
  usersState,
  sessionState
});
