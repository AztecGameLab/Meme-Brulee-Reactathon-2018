import { createSelector } from "reselect";

//Input Selectors
const getAllMemeTemplates = state => state.gameState.memeTemplates;
const getCurrentTemplate = state => state.gameState.currentTemplate;

//Memoized Selectors
export const selectAllTemplates = createSelector([getAllMemeTemplates], templates => {
  return templates;
});

export const selectCurrentTemplate = createSelector([getCurrentTemplate], currTemplate => {
  return currTemplate;
});
