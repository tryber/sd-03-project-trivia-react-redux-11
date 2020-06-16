import { REQUEST_TRIVIA, RECEIVE_TRIVIA_SUCCESS, RECEIVE_TRIVIA_FAILURE, RESET_TRIVIA } from '../actions/types';

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
      return {
        gameIsFetching: false,
        trivia: { responseCode: payload.responseCode, results: [...payload.results] },
      };
    case RECEIVE_TRIVIA_FAILURE:
      return { ...state, gameIsFetching: false, error: payload };
    case RESET_TRIVIA:
      return initialState;
    default:
      return state;
  }
};
