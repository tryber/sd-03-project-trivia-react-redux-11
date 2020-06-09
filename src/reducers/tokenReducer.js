import {
  REQUEST_TOKEN, RECEIVE_TOKEN_SUCCESS, RECEIVE_TOKEN_FAILURE
} from '../actions/types';

const initialState = {
  isFetching: true,
  token: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST_TOKEN:
      return { ...state, isFetching: true };
    case RECEIVE_TOKEN_SUCCESS:
      return { ...state, isFetching: false, token: payload };
    case RECEIVE_TOKEN_FAILURE:
      return { ...state, isFetching: false, error: payload };
    default:
      return state;
  }
};
