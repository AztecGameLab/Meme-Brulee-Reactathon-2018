//Constants
import { STORE_SESSION } from "./sessionConstants";

//Status Process
//idle -> loading -> success or fail

//Session Reducer
export default (state = {}, action) => {
  switch (action.type) {
    case STORE_SESSION:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};
