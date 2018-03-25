//Constants
import { STORE_SESSION } from "./sessionConstants";

export const storeSession = session => {
  return dispatch => {
    dispatch({ type: STORE_SESSION, payload: session });
  };
};
