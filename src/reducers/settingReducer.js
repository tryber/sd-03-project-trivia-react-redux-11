import { CHANGE_CATEGORY, CHANGE_DIFFICULTY, CHANGE_TYPE } from '../actions/types';

const initialState = {
  category: '',
  difficulty: '',
  type: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_CATEGORY:
      return { ...state, category: payload };
    case CHANGE_DIFFICULTY:
      return { ...state, difficulty: payload };
    case CHANGE_TYPE:
      return { ...state, type: payload };
    default:
      return state;
  }
};
