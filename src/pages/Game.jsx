import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchTrivia from '../actions/fetchTrivia';
import TriviaHeader from '../components/TriviaHeader';
import Loading from '../components/Loading';

const getRandomIndex = (max) => Math.round(Math.random() * max);

export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalId: 0,
      incorrectAnswerClass: '',
      correctAnswerClass: '',
      randomIndexes: [],
      timer: 30,
      disableButton: false,
    };
    this.createAnswersButtons = this.createAnswersButtons.bind(this);
    this.changeClass = this.changeClass.bind(this);
    this.createCorrectAnswerIndexes = this.createCorrectAnswerIndexes.bind(this);
    this.fetchTrivia = this.fetchTrivia.bind(this);
    this.timerCountdown = this.timerCountdown.bind(this);
  }

  componentDidMount() {
    this.timerCountdown();
  }

  componentWillUnmount() {
    const { intervalId } = this.state;
    clearInterval(intervalId);
  }

  timerCountdown() {
    const intervalId = setInterval(() => {
      this.setState((state) => {
        if (state.timer > 1) {
          return { timer: state.timer - 1 };
        }
        this.changeClass();
        return {
          disableButton: true,
          timer: 0,
        };
      });
    }, 1000);
    this.setState({ intervalId });
  }

  changeClass() {
    this.setState({
      incorrectAnswerClass: 'red-border',
      correctAnswerClass: 'green-border',
    });
  }

  createAnswersButtons() {
    const { results } = this.props;
    const { correctAnswerClass, incorrectAnswerClass, randomIndexes, disableButton } = this.state;
    const answers = results[0].incorrect_answers.map((answer, index) => (
      <li>
        <button
          data-testid={`wrong-answer-${index}`}
          type="button"
          key={answer}
          disabled={disableButton}
          className={`waves-effect deep-orange btn width-90 margin-10p ${incorrectAnswerClass}`}
          onClick={() => this.changeClass()}
        >
          {answer}
        </button>
      </li>
    ));
    answers.splice(
      randomIndexes[0],
      0,
      <li>
        <button
          data-testid="correct-answer"
          className={`waves-effect deep-orange btn width-90 margin-10p ${correctAnswerClass}`}
          onClick={() => this.changeClass()}
          type="button"
          disabled={disableButton}
          key={results[0].correct_answer}
        >
          {results[0].correct_answer}
        </button>
      </li>,
    );
    return answers;
  }

  createCorrectAnswerIndexes() {
    const { randomIndexes } = this.state;
    const { results } = this.props;
    if (results.length > 0 && randomIndexes.length === 0) {
      const index = Object.values(results).map((result) =>
        getRandomIndex(result.incorrect_answers.length),
      );
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
    const { results, gameIsFetching, tokenIsFetching } = this.props;
    const { timer } = this.state;
    this.fetchTrivia();
    if (tokenIsFetching || gameIsFetching) {
      return <Loading />;
    }
    this.createCorrectAnswerIndexes();
    return (
      <div className="row">
        <div className="white-text container col offset-s4 s4">
          <TriviaHeader />
          <div className="row black-coral">
            <div className="col s6">
              <h5 data-testid="question-category">{results[0].category}</h5>
              <p data-testid="question-text">{results[0].question}</p>
              <p>Tempo: {timer}</p>
            </div>
            <div className="col s6">
              <ul>{this.createAnswersButtons()}</ul>
            </div>
          </div>
        </div>
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
