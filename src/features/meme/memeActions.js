//Constants
import { LOAD_TEMPLATES_PROGRESS, LOAD_TEMPLATES_SUCCESS, LOAD_TEMPLATES_FAILURE, SET_RANDOM_TEMPLATE, SUBMIT_MEME_PROGRESS, SUBMIT_MEME_SUCCESS, SUBMIT_MEME_FAILURE } from "./memeConstants";

//Selectors
import { selectAllTemplates } from "./memeSelectors";

import axios from "axios";

//Imgflip API Calls
const template_fetch = () => {
  return fetch("https://api.imgflip.com/get_memes").then(response => response.json());
};

const meme_post = memeObj => {
  memeObj.username = process.env.REACT_APP_IMGFLIP_USER;
  memeObj.password = process.env.REACT_APP_IMGFLIP_PASS;
  const baseUrl = "https://api.imgflip.com/caption_image";
  const encodedParams = paramEncoder(memeObj);
  debugger;

  return axios(baseUrl + encodedParams).then(response => {
    return response.data;
  });
};

//Helper Encoder
const paramEncoder = params => {
  return (
    "?" +
    Object.keys(params)
      .map(key => {
        return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
      })
      .join("&")
  );
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

export const submitMeme = memeObj => {
  return dispatch => {
    dispatch({ type: SUBMIT_MEME_PROGRESS });
    return meme_post(memeObj)
      .then(response => {
        if (response.success) {
          const memeData = response.data;
          dispatch(submitMemeSuccess(memeData));
        } else {
          const errorMessage = response.error_message;
          dispatch(submitMemeFailure(errorMessage));
        }
      })
      .catch(response => {
        const errorMessage = response.error_message;
        dispatch(submitMemeFailure(errorMessage));
      });
  };
};

const submitMemeSuccess = memeObj => {
  return dispatch => {
    dispatch({ type: SUBMIT_MEME_SUCCESS, payload: memeObj });
  };
};

const submitMemeFailure = errorObj => {
  const errorMsg = errorObj.msg;
  return dispatch => {
    dispatch({ type: SUBMIT_MEME_FAILURE, payload: errorMsg });
  };
};
