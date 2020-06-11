import { CHANGE_USER_INFO, CHANGE_SCORE, ADD_ASSERTION, RESET_USER } from '../actions/types';

const initialState = {
  player: {
    score: 0,
    name: '',
    gravatarEmail: '',
    assertions: 0,
  },
};

export default (state = initialState, { type, name, gravatarEmail, score }) => {
  switch (type) {
    case CHANGE_USER_INFO:
      localStorage.setItem('state', JSON.stringify({ player: { ...state.player, name, gravatarEmail } }));
      return { ...state, player: { ...state.player, name, gravatarEmail } };
    case CHANGE_SCORE:
      localStorage.setItem('state', JSON.stringify({ player: { ...state.player, score: state.player.score + score } }));
      return { ...state, player: { ...state.player, score: state.player.score + score } };
    case ADD_ASSERTION:
      localStorage.setItem('state', JSON.stringify({ player: { ...state.player, assertions: state.player.assertions + 1 } }));
      return { ...state, player: { ...state.player, assertions: state.player.assertions + 1 } };
    case RESET_USER:
      return initialState;
    default:
      return state;
  }
};
