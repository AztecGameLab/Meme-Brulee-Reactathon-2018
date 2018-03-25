import { createSelector } from "reselect";

//Input Selectors
const getMyEmotions = state => state.usersState.currentEmotionData;
const getPlayers = state => state.usersState.players;
const getEmojiMap = state => state.usersState.emojiMap;

//Memoized Selectors
export const selectMyEmotions = createSelector([getMyEmotions], emotions => {
  return emotions;
});

export const selectPlayers = createSelector([getPlayers], players => {
  return players;
});

export const selectEmojiMap = createSelector([getEmojiMap], emojiMap => {
  return emojiMap;
});
