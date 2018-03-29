//Constants
import {
  LOAD_TEMPLATES_PROGRESS,
  LOAD_TEMPLATES_SUCCESS,
  LOAD_TEMPLATES_FAILURE,
  SET_RANDOM_TEMPLATE,
  SUBMIT_MEME_PROGRESS,
  SUBMIT_MEME_SUCCESS,
  SUBMIT_MEME_FAILURE,
  PHASE_CHANGE,
  COOK_TIME_IS_UP,
  RECEIVED_MEMES,
  START_COOK
} from "./memeConstants";

//Selectors
import { selectAllTemplates } from "./memeSelectors";

//Requests
import axios from "axios";

//Game Settings
export const GM_PHASES = ["idle", "cooking the memes", "presentation"];
const GM_TIME_INTERVALS = { cook_time: 3000, present_time: 8000 };

//Imgflip API Calls
const template_fetch = () => {
  return fetch("https://api.imgflip.com/get_memes").then(response => response.json());
};

const meme_post = memeObj => {
  memeObj.username = process.env.REACT_APP_IMGFLIP_USER;
  memeObj.password = process.env.REACT_APP_IMGFLIP_PASS;
  const baseUrl = "https://api.imgflip.com/caption_image";
  const encodedParams = paramEncoder(memeObj);
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
      .then(memeObj => {
        return dispatch(loadTemplatesSuccess(memeObj));
      })
      .catch(errorObj => dispatch(loadTemplatesFailed(errorObj)));
  };
};

export const setRandomTemplate = () => {
  return (dispatch, getState) => {
    const memeTemplates = selectAllTemplates(getState());
    const randomIndex = Math.floor(Math.random() * memeTemplates.length);
    return dispatch({
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

//State 1.
//People Load In
//Action is called when start is pressed
//---------------------------------------------
export const playGame = () => {
  return (dispatch, getState) => {
    //State 2.
    //Fetch 100 Meme Templates (slight preloading)
    return dispatch(fetchMemeTemplates()).then(() => {
      //Pick a random template
      dispatch(setRandomTemplate());
      //Change phase for UI
      dispatch({ type: PHASE_CHANGE, payload: GM_PHASES[1] });
      //Start 20 Second Countdown
      dispatch({ type: START_COOK });

      setTimeout(() => {
        //End Countdown
        dispatch({ type: COOK_TIME_IS_UP });
        //Submits on last submittee or by timer (LOCAL)
        //---------------------------------------------
        //State 3.
        //Meme post and broadcast your meme (LOCAL)
        //Change Phase for UI
        dispatch({ type: PHASE_CHANGE, payload: GM_PHASES[2] });
        //Present meme by meme
        // dispatch({type: PRESENT_MEME, payload: })
        //Run ProcessImage
        //Broadcase emotions
        //Present emojis based on aggregaged data (later on per user)
      }, GM_TIME_INTERVALS["cook_time"]);
    });
  };
};

export const receivedMemes = newMeme => {
  return dispatch => {
    dispatch({ type: RECEIVED_MEMES, payload: newMeme });
  };
};

export const playAgain = () => {
  return dispatch => {
    dispatch({ type: PHASE_CHANGE, payload: GM_PHASES[0] });
  };
};
