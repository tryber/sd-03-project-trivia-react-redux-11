import { CHANGE_DIFFICULTY } from './types';

const changeDifficulty = (payload) => ({
  type: CHANGE_DIFFICULTY,
  payload,
});

export default changeDifficulty;
