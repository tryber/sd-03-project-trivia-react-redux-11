import { CHANGE_USER_INFO } from '../actions/types';

const initialState = {
  score: 0,
  name: '',
  gravatarEmail: '',
};

export default (state = initialState, { type, name, gravatarEmail }) => {
  switch (type) {
    case CHANGE_USER_INFO:
      return { ...state, gameIsFetching: false, name, gravatarEmail };
    default:
      return state;
  }
};
