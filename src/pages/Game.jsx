import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchTrivia from '../actions/fetchTrivia';
import TriviaHeader from '../components/TriviaHeader';
import Loading from '../components/Loading';
import changeScore from '../actions/changeScore';
import addAssertion from '../actions/addAssertion';

const getRandomIndex = (max) => Math.round(Math.random() * max);

const calculateScore = (timer, difficulty) => {
  const dif = { hard: 3, medium: 2, easy: 1 };
  return 10 + (timer * dif[difficulty]);
};

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
    this.incorrectAnswerButton = this.incorrectAnswerButton.bind(this);
    this.correctAnswerButton = this.correctAnswerButton.bind(this);
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
        return { timer: 0 };
      });
    }, 1000);
    this.setState({ intervalId });
  }

  changeClass() {
    this.setState({
      incorrectAnswerClass: 'red-border',
      correctAnswerClass: 'green-border',
      disableButton: true,
    });
  }

  incorrectAnswerButton(answer, index) {
    const { incorrectAnswerClass, disableButton, intervalId } = this.state;
    return (
      <li>
        <button
          data-testid={`wrong-answer-${index}`}
          type="button"
          key={answer}
          disabled={disableButton}
          className={`waves-effect deep-orange btn width-90 margin-10p ${incorrectAnswerClass}`}
          onClick={() => {
            this.changeClass();
            clearInterval(intervalId);
          }}
        >
          {answer}
        </button>
      </li>
    );
  }

  correctAnswerButton() {
    const { results, changeScr, addAssert } = this.props;
    const { correctAnswerClass, disableButton, intervalId, timer } = this.state;
    return (
      <li>
        <button
          data-testid="correct-answer"
          className={`waves-effect deep-orange btn width-90 margin-10p ${correctAnswerClass}`}
          onClick={() => {
            clearInterval(intervalId);
            changeScr(calculateScore(timer, results[0].difficulty));
            addAssert();
            this.changeClass();
          }}
          type="button"
          disabled={disableButton}
          key={results[0].correct_answer}
        >
          {results[0].correct_answer}
        </button>
      </li>
    );
  }

  createAnswersButtons() {
    const { results } = this.props;
    const { randomIndexes } = this.state;
    const answers = results[0].incorrect_answers
      .map((answer, index) => this.incorrectAnswerButton(answer, index));
    answers.splice(randomIndexes[0], 0, this.correctAnswerButton());
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

const mapDispatchToProps = (dispatch) => bindActionCreators(
  { fetch: fetchTrivia, changeScr: changeScore, addAssert: addAssertion },
  dispatch,
);

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
  changeScr: PropTypes.func.isRequired,
  tokenIsFetching: PropTypes.bool.isRequired,
  responseCode: PropTypes.number.isRequired,
  gameIsFetching: PropTypes.bool.isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Game.defaultProps = {
  token: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
