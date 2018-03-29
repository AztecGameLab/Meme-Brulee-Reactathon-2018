//Constants
import { CLEAR_MEMES } from "../meme/memeConstants";
import { PROCESS_IMAGE_LOADING, PROCESS_IMAGE_SUCCESS, ADD_PLAYER, REMOVE_PLAYER, RECIEVE_REACTIONS, AGGREGATE_EMOJIS, RECEIVED_MEMES } from "./UserConstants";

//Initial State
const initialUsersState = {
  players: {},
  processImageStatus: "idle",
  currentEmotionData: [],
  emojiMap: [
    { emoji: "😤", val: 0 }, // Anger
    { emoji: "🤬", val: 0 }, // Contempt
    { emoji: "🤮", val: 0 }, // Digust
    { emoji: "😨", val: 0 }, // Fear
    { emoji: "😂", val: 0 }, // Happiness
    { emoji: "🤔", val: 0 }, // Thinking
    { emoji: "😭", val: 0 }, // Sad
    { emoji: "🤯", val: 0 } // Surprised
  ]
}; //idle -> loading -> success or fail //Session Reducer
//Status Process
export default (state = initialUsersState, action) => {
  let player;
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
    case RECEIVED_MEMES:
      player = state.players[action.payload.id];
      if (player) {
      player.meme = action.payload.url;
      }
    return Object.assign({}, state, { players: Object.assign({}, state.players) });
    case RECIEVE_REACTIONS:
      player = state.players[action.payload.id];
      if (player) {
        player.faceData = action.payload.faceData;
      }
      return Object.assign({}, state, { players: Object.assign(state.players) });
    case AGGREGATE_EMOJIS:
      return Object.assign({}, state, { emojiMap: action.payload });
    case CLEAR_MEMES:
      return {
        ...initialUsersState
      };
    default:
      return state;
  }
};
