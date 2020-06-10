import {
  REQUEST_TRIVIA, RECEIVE_TRIVIA_SUCCESS, RECEIVE_TRIVIA_FAILURE,
} from '../actions/types';

const initialState = {
  gameIsFetching: true,
  trivia: {
    response_code: -1,
    results: [],
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST_TRIVIA:
      return { ...state, gameIsFetching: true };
    case RECEIVE_TRIVIA_SUCCESS:
      return { ...state, gameIsFetching: false, trivia: payload };
    case RECEIVE_TRIVIA_FAILURE:
      return { ...state, gameIsFetching: false, error: payload };
    default:
      return state;
  }
};
