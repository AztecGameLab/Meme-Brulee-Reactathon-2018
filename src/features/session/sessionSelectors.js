import { createSelector } from "reselect";

//Input Selector
const getSession = state => state.sessionState;

//Memoized Selectors
export const selectSessionID = createSelector([getSession], session => {
  return session.id;
});
