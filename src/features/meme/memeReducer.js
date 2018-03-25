//Constants
import { LOAD_TEMPLATES_PROGRESS, LOAD_TEMPLATES_SUCCESS, LOAD_TEMPLATES_FAILURE, SET_RANDOM_TEMPLATE, CLEAR_MEMES } from "./memeConstants";

//Initial State
const initialMemeState = {
  currentTemplate: "",
  currentPhase: "",
  loadMemeStatus: "idle",
  memeTemplates: [],
  errorMessage: ""
};

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
    case CLEAR_MEMES:
      return {
        ...initialMemeState
      };
    default:
      return state;
  }
};
