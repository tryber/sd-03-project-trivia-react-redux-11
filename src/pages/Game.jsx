import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchTrivia from '../actions/fetchTrivia';

const getRandomIndex = (max) => Math.round(Math.random() * max);

export class Game extends Component {
  constructor(props) {
    super(props);
    this.createAnswersButtons = this.createAnswersButtons.bind(this);
  }

  createAnswersButtons() {
    const { results } = this.props;
    const answers = results[0].incorrect_answers.map((answer, index) => (
      <button data-testid={`wrong-answer-${index}`} type="button" key={answer}>
        {answer}
      </button>
    ));
    answers.splice(
      getRandomIndex(results[0].incorrect_answers.length), 0,
      <button data-testid="correct-answer" type="button" key={results[0].correct_answer}>
        {results[0].correct_answer}
      </button>,
    );
    return answers;
  }

  render() {
    const {
      token,
      fetch,
      tokenIsFetching,
      responseCode,
      gameIsFetching,
      results,
    } = this.props;
    if (!tokenIsFetching && responseCode === -1) {
      fetch(token);
    }
    if (tokenIsFetching || gameIsFetching) {
      return <span>Loading</span>;
    }
    return (
      <div className="white-text">
        <h4 data-testid="question-category">{results[0].category}</h4>
        <p data-testid="question-text">{results[0].question}</p>
        {this.createAnswersButtons()}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetch: fetchTrivia }, dispatch);

const mapStateToProps = (state) => ({
  token: state.tokenReducer.token.token,
  tokenIsFetching: state.tokenReducer.tokenIsFetching,
  gameIsFetching: state.gameReducer.gameIsFetching,
  responseCode: state.gameReducer.trivia.response_code,
  results: state.gameReducer.trivia.results,
});

Game.propTypes = {
  token: PropTypes.string,
  fetch: PropTypes.func.isRequired,
  tokenIsFetching: PropTypes.bool.isRequired,
  responseCode: PropTypes.number.isRequired,
  gameIsFetching: PropTypes.bool.isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Game.defaultProps = {
  token: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
