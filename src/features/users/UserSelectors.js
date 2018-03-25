import { createSelector } from "reselect";

//Input Selectors
const getMyEmotions = state => state.usersState.currentEmotionData;

//Memoized Selectors
export const selectMyEmotions = createSelector([getMyEmotions], emotions => {
  return emotions[0];
});
