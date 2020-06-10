import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchTrivia from '../actions/fetchTrivia';
import TriviaHeader from '../components/TriviaHeader';

const getRandomIndex = (max) => Math.round(Math.random() * max);

export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incorrectAnswerClass: '',
      correctAnswerClass: '',
      randomIndexes: [],
    };
    this.createAnswersButtons = this.createAnswersButtons.bind(this);
    this.changeClass = this.changeClass.bind(this);
    this.createCorrectAnswerIndexes = this.createCorrectAnswerIndexes.bind(this);
    this.fetchTrivia = this.fetchTrivia.bind(this);
  }

  changeClass() {
    this.setState({
      incorrectAnswerClass: 'red-border',
      correctAnswerClass: 'green-border',
    });
  }

  createAnswersButtons() {
    const { results } = this.props;
    const { correctAnswerClass, incorrectAnswerClass, randomIndexes } = this.state;
    const answers = results[0].incorrect_answers.map((answer, index) => (
      <button
        data-testid={`wrong-answer-${index}`}
        type="button"
        key={answer}
        className={incorrectAnswerClass}
        onClick={() => this.changeClass()}
      >
        {answer}
      </button>
    ));
    answers.splice(
      randomIndexes[0],
      0,
      <button
        data-testid="correct-answer"
        className={correctAnswerClass}
        onClick={() => this.changeClass()}
        type="button"
        key={results[0].correct_answer}
      >
        {results[0].correct_answer}
      </button>,
    );
    return answers;
  }

  createCorrectAnswerIndexes() {
    const { randomIndexes } = this.state;
    const { results } = this.props;
    if (results.length > 0 && randomIndexes.length === 0) {
      const index = Object.values(results)
        .map((result) => getRandomIndex(result.incorrect_answers.length));
      this.setState({ randomIndexes: index });
    }
  }

  fetchTrivia() {
    const { tokenIsFetching, responseCode, token, fetch } = this.props;
    if (!tokenIsFetching && responseCode === -1) {
      fetch(token);
    }
  }

  render() {
    const { results } = this.props;
    this.fetchTrivia();
    const { gameIsFetching, tokenIsFetching } = this.props;
    if (tokenIsFetching || gameIsFetching) {
      return <span>Loading</span>;
    }
    this.createCorrectAnswerIndexes();
    return (
      <div className="white-text">
        <TriviaHeader />
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
