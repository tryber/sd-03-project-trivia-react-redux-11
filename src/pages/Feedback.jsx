import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import TriviaHeader from '../components/TriviaHeader';
import resetUser from '../actions/resetUser';

const Feedback = ({ resetUsr }) => {
  const state = localStorage.getItem('state') !== null
    ? JSON.parse(localStorage.getItem('state'))
    : { player: { assertions: '', score: '' } };
  const { assertions, score } = state.player;
  const answerTitle = assertions >= 3 ? 'Mandou bem!' : 'Podia ser melhor...';
  return (
    <div className="row">
      <div className="col s4 offset-s4">
        <TriviaHeader />
        <div className="center-align white-text black-coral">
          <h5 data-testid="feedback-text">{answerTitle}</h5>
          <p>
            You got
            <span data-testid="feedback-total-question">{` ${assertions || 0} `}</span>
            questions,
          </p>
          <p>
            and did <span data-testid="feedback-total-score">{score || 0}</span> points
          </p>
          <section>
            <div>
              <Link
                data-testid="btn-ranking"
                to="/ranking"
                className="waves-effect deep-orange btn margin-10p width-40"
              >
                RANKING
              </Link>
            </div>
            <div>
              <Link
                data-testid="btn-play-again"
                to="/"
                onClick={() => resetUsr()}
                className="waves-effect deep-orange btn margin-10p width-40"
              >
                PLAY AGAIN
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

Feedback.propTypes = {
  resetUsr: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ resetUsr: resetUser }, dispatch);

export default connect(null, mapDispatchToProps)(Feedback);
