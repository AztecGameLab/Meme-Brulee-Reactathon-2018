import { createSelector } from "reselect";

//Input Selectors
const getAllMemeTemplates = state => state.gameState.memeTemplates;
const getCurrentTemplate = state => state.gameState.currentTemplate;
const getCompletedMemes = state => state.gameState.completedMemes;
const getReceivedMemes = state => state.gameState.recievedMemes;
const getMyEmotions = state => state.gameState.currentEmoticons;
const getCookStatus = state => state.gameState.cookTimeIsUp;
const getMemeWasSent = state => state.gameState.memeWasSent;
const getCurrentPhase = state => state.gameState.currentPhase;

//Memoized Selectors
export const selectAllTemplates = createSelector([getAllMemeTemplates], templates => {
  return templates;
});

export const selectCurrentTemplate = createSelector([getCurrentTemplate], currTemplate => {
  return currTemplate;
});

export const selectCompletedMemes = createSelector([getCompletedMemes], completedMemes => {
  return completedMemes;
});

export const selectMyEmotions = createSelector([getMyEmotions], emotions => {
  return emotions;
});

export const selectCookingStatus = createSelector([getCookStatus], status => {
  return status;
});

export const selectMemeWasSent = createSelector([getMemeWasSent], wasSent => {
  return wasSent;
});

export const selectCurrentPhase = createSelector([getCurrentPhase], phase => {
  return phase;
});

export const selectReceivedMemes = createSelector([getReceivedMemes], receivedMemes => {
  return receivedMemes;
});
