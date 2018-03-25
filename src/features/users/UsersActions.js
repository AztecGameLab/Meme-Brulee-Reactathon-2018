//Constants
import { PROCESS_IMAGE_LOADING, PROCESS_IMAGE_SUCCESS, PROCESS_IMAGE_FAILURE, ADD_PLAYER, REMOVE_PLAYER, RECIEVE_REACTIONS } from "./UserConstants";

import axios from "axios";

//Microsoft Face API
const face_api_process = params => {
  //params.returnOptions
  //params.b64Data
  const baseURL = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";
  const imageBuffer = b64ToArrBuffer(params.b64Data);
  const serializedParams = serializeImageParams(params);

  return axios({
    url: baseURL + "?" + serializedParams,
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream",
      "Ocp-Apim-Subscription-Key": process.env.REACT_APP_FACE_API_KEY
    },
    data: imageBuffer
  }).then(response => {
    return response.data;
  });
};

const serializeImageParams = paramObj => {
  return Object.keys(paramObj)
    .filter(key => key !== "b64Data")
    .map(key => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(paramObj[key]);
    })
    .join("&");
};

const b64ToArrBuffer = base64 => {
  let binary_string = window.atob(base64);
  let len = binary_string.length;
  let bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
};

export const processImage = params => {
  return dispatch => {
    dispatch({ type: PROCESS_IMAGE_LOADING });
    return face_api_process(params)
      .then(emotionData => dispatch(processImageSuccess(emotionData)))
      .catch(error => dispatch(processImageFailure(error)));
  };
};

const processImageSuccess = emotionData => {
  return dispatch => {
    dispatch({
      type: PROCESS_IMAGE_SUCCESS,
      payload: emotionData
    });
  };
};

const processImageFailure = error => {
  return dispatch => {
    dispatch({
      type: PROCESS_IMAGE_FAILURE,
      payload: error.message
    });
  };
};

export const addPlayer = connections => {
  return dispatch => {
    dispatch({ type: ADD_PLAYER, payload: connections });
  };
};

export const removePlayer = playerName => {
  return dispatch => {
    dispatch({ type: REMOVE_PLAYER, payload: playerName });
  };
};

export const recieveReactions = reactionData => {
  return dispatch => {
    dispatch({ type: RECIEVE_REACTIONS, payload: reactionData });
  };
};
