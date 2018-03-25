//Constants
import { LOAD_TEMPLATES_PROGRESS, LOAD_TEMPLATES_SUCCESS, LOAD_TEMPLATES_FAILURE, SET_RANDOM_TEMPLATE } from "./memeConstants";

//Selectors
import { selectAllTemplates } from "./memeSelectors";

//Imgflip API Call
const template_fetch = () => {
  return fetch("https://api.imgflip.com/get_memes").then(response => response.json());
};

//Internal Helper Dispatches for Template
const loadTemplatesSuccess = memeObj => {
  const { memes } = memeObj.data;
  return dispatch => {
    dispatch({
      type: LOAD_TEMPLATES_SUCCESS,
      payload: memes
    });
  };
};

const loadTemplatesFailed = error => {
  const errorMsg = error.msg;
  return dispatch => {
    dispatch({
      type: LOAD_TEMPLATES_FAILURE,
      payload: errorMsg
    });
  };
};

export const fetchMemeTemplates = () => {
  return dispatch => {
    dispatch({ type: LOAD_TEMPLATES_PROGRESS });
    return template_fetch()
      .then(memeObj => dispatch(loadTemplatesSuccess(memeObj)))
      .catch(errorObj => dispatch(loadTemplatesFailed(errorObj)));
  };
};

export const setRandomTemplate = () => {
  return (dispatch, getState) => {
    const memeTemplates = selectAllTemplates(getState());
    const randomIndex = Math.floor(Math.random() * memeTemplates.length);
    console.log(randomIndex);
    dispatch({
      type: SET_RANDOM_TEMPLATE,
      payload: memeTemplates[randomIndex]
    });
  };
};
