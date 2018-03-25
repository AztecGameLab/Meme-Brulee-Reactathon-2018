//Constants
import { CLEAR_MEMES } from "../meme/memeConstants";
import { PROCESS_IMAGE_LOADING, PROCESS_IMAGE_SUCCESS } from "./UserConstants";

//Initial State
const initialUsersState = {
  players: [
    {
      connection_id: {
        reaction: { microsoft_face_emotion: ["happy: 0.45"] }
      }
    }
  ],
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
    case CLEAR_MEMES:
      return {
        ...initialUsersState
      };
    default:
      return state;
  }
};
