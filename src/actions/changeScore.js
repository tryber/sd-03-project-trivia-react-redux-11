import { CHANGE_SCORE } from './types';

const changeScore = (score) => ({
  type: CHANGE_SCORE,
  score,
});

export default changeScore;
