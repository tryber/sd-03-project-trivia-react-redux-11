import getToken from '../services/apiRequest';
import { REQUEST_TOKEN, RECEIVE_TOKEN_SUCCESS, RECEIVE_TOKEN_FAILURE } from './types';

const requestToken = () => ({
  type: REQUEST_TOKEN,
});

const requestTokenSuccess = (data) => ({
  type: RECEIVE_TOKEN_SUCCESS,
  payload: data,
});

const receiveTokenFailure = (error) => ({
  type: RECEIVE_TOKEN_FAILURE,
  payload: error,
});

export default function fetchPlanets() {
  return (dispatch) => {
    dispatch(requestToken());
    return getToken()
      .then(
        (data) => dispatch(requestTokenSuccess(data)),
        (error) => dispatch(receiveTokenFailure(error.message)),
      );
  };
}
