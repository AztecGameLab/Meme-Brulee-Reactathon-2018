//Constants
import {
  LOAD_TEMPLATES_PROGRESS,
  LOAD_TEMPLATES_SUCCESS,
  LOAD_TEMPLATES_FAILURE,
  SET_RANDOM_TEMPLATE,
  CLEAR_MEMES,
  SUBMIT_MEME_PROGRESS,
  SUBMIT_MEME_SUCCESS,
  SUBMIT_MEME_FAILURE,
  PHASE_CHANGE,
  START_COOK,
  COOK_TIME_IS_UP,
  RECEIVED_MEMES
} from "./memeConstants";

import { GM_PHASES } from "./memeActions";

//Initial State
const initialMemeState = {
  currentTemplate: "idle",
  currentPhase: GM_PHASES[0],
  loadMemeStatus: "idle",
  submitMemeStatus: "idle",
  memeTemplates: [],
  completedMemes: [],
  errorMessage: "",
  cookTimeIsUp: "idle",
  recievedMemes: [],
  memeWasSent: false
};

//Status Process
//idle -> loading -> success or fail

//Session Reducer
export default (state = initialMemeState, action) => {
  switch (action.type) {
    case LOAD_TEMPLATES_PROGRESS:
      return Object.assign({}, state, { loadMemeStatus: "loading" });
    case LOAD_TEMPLATES_SUCCESS:
      return Object.assign({}, state, { loadMemeStatus: "success", memeTemplates: action.payload });
    case LOAD_TEMPLATES_FAILURE:
      return Object.assign({}, state, { loadMemeStatus: "fail", errorMessage: action.payload });
    case SET_RANDOM_TEMPLATE:
      return Object.assign({}, state, { currentTemplate: action.payload });
    case SUBMIT_MEME_PROGRESS:
      return Object.assign({}, state, { submitMemeStatus: "loading" });
    case SUBMIT_MEME_SUCCESS:
      return Object.assign({}, state, { loadMemeStatus: "success", completedMemes: action.payload });
    case SUBMIT_MEME_FAILURE:
      return Object.assign({}, state, { loadMemeStatus: "fail", errorMessage: action.payload });
    case PHASE_CHANGE:
      if (action.payload === GM_PHASES[0]) {
        return { ...initialMemeState };
      } else {
        return Object.assign({}, state, { currentPhase: action.payload });
      }
    case START_COOK:
      return Object.assign({}, state, { cookTimeIsUp: "progress" });
    case COOK_TIME_IS_UP:
      return Object.assign({}, state, { cookTimeIsUp: "finished" });
    case RECEIVED_MEMES:
      return Object.assign({}, state, { recievedMemes: [...state.recievedMemes, action.payload], memeWasSent: true });
    case CLEAR_MEMES:
      return {
        ...initialMemeState
      };
    default:
      return state;
  }
};
