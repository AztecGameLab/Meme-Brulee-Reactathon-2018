//Constants
import {
  LOAD_TEMPLATES_PROGRESS,
  LOAD_TEMPLATES_SUCCESS,
  LOAD_TEMPLATES_FAILURE,
  SET_RANDOM_TEMPLATE,
  CLEAR_MEMES,
  SUBMIT_MEME_PROGRESS,
  SUBMIT_MEME_SUCCESS,
  SUBMIT_MEME_FAILURE
} from "./memeConstants";

//Initial State
const initialMemeState = {
  currentTemplate: "",
  currentPhase: "",
  loadMemeStatus: "idle",
  submitMemeStatus: "idle",
  memeTemplates: [],
  completedMemes: [],
  errorMessage: ""
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
      return Object.assign({}, state, { loadMemeStatus: "success", completedMemes: [...state.completedMemes, action.payload] });
    case SUBMIT_MEME_FAILURE:
      return Object.assign({}, state, { loadMemeStatus: "fail", errorMessage: action.payload });
    case CLEAR_MEMES:
      return {
        ...initialMemeState
      };
    default:
      return state;
  }
};
