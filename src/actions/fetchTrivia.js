import { getTrivia } from '../services/apiRequest';
import { REQUEST_TRIVIA, RECEIVE_TRIVIA_SUCCESS, RECEIVE_TRIVIA_FAILURE } from './types';

const requestTrivia = () => ({
  type: REQUEST_TRIVIA,
});

const requestTriviaSuccess = (data) => ({
  type: RECEIVE_TRIVIA_SUCCESS,
  payload: data,
});

const receiveTriviaFailure = (error) => ({
  type: RECEIVE_TRIVIA_FAILURE,
  payload: error,
});

export default function fetchTrivia(token) {
  return (dispatch) => {
    dispatch(requestTrivia());
    return getTrivia(token)
      .then(
        (data) => dispatch(requestTriviaSuccess(data)),
        (error) => dispatch(receiveTriviaFailure(error.message)),
      );
  };
}
