import {
  REQUEST_TOKEN, RECEIVE_TOKEN_SUCCESS, RECEIVE_TOKEN_FAILURE,
} from '../actions/types';

let token = [];
let tokenIsFetching = true;

if (localStorage.getItem('token')) {
  token = JSON.parse(localStorage.getItem('token'));
  tokenIsFetching = false;
}

const initialState = {
  tokenIsFetching,
  token,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST_TOKEN:
      return { ...state, tokenIsFetching: true };
    case RECEIVE_TOKEN_SUCCESS:
      return { ...state, tokenIsFetching: false, token: payload };
    case RECEIVE_TOKEN_FAILURE:
      return { ...state, tokenIsFetching: false, error: payload };
    default:
      return state;
  }
};
