//Constants
import { CLEAR_MEMES } from "../meme/memeConstants";
import { PROCESS_IMAGE_LOADING, PROCESS_IMAGE_SUCCESS, ADD_PLAYER, REMOVE_PLAYER, RECIEVE_REACTIONS } from "./UserConstants";

//Initial State
const initialUsersState = {
  players: {},
  processImageStatus: "idle",
  currentEmotionData: []
};

//Status Process
//idle -> loading -> success or fail

//Session Reducer
export default (state = initialUsersState, action) => {
  switch (action.type) {
    case PROCESS_IMAGE_LOADING:
      return Object.assign({}, state, { processImageStatus: "loading" });
    case PROCESS_IMAGE_SUCCESS:
      return Object.assign({}, state, { processImageStatus: "success", currentEmotionData: action.payload });
    case ADD_PLAYER:
      return Object.assign({}, state, { players: Object.assign(state.players, action.payload) });
    case REMOVE_PLAYER:
      let { players } = state;
      delete players[action.payload];
      return Object.assign({}, state, { players });
    case RECIEVE_REACTIONS:
      return Object.assign({}, state, { players: Object.assign(state.players, action.payload) });
    case CLEAR_MEMES:
      return {
        ...initialUsersState
      };
    default:
      return state;
  }
};
