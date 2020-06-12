import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import TriviaHeader from '../components/TriviaHeader';
import resetUser from '../actions/resetUser';
import resetTrivia from '../actions/resetTrivia';

const Feedback = ({ resetUsr, resetTrv }) => {
  const state = (localStorage.getItem('state') !== null)
    ? JSON.parse(localStorage.getItem('state'))
    : { player: { assertions: '', score: '' } };
  const { assertions, score } = state.player;
  const answerTitle = assertions >= 3 ? 'Mandou bem!' : 'Podia ser melhor...';
  return (
    <div>
      <TriviaHeader />
      <h2 data-testid="feedback-text">{answerTitle}</h2>
      <h3>
        <span>Você acertou </span> 
        <span data-testid="feedback-total-question">{assertions || 0}</span>
        <span> questões!</span>
      </h3>
      <h3>Um total de <span data-testid="feedback-total-score">{score || 0}</span> pontos</h3>
      <div>
        <Link data-testid="btn-ranking" to="/ranking">
          VER RANKING
        </Link>
      </div>
      <div>
        <Link
          data-testid="btn-play-again"
          onClick={() => {
            resetUsr();
            resetTrv();
          }}
          to="/"
        >
          JOGAR NOVAMENTE
        </Link>
      </div>
    </div>
  );
};

Feedback.propTypes = {
  resetUsr: PropTypes.func.isRequired,
  resetTrv: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => bindActionCreators(
  { resetUsr: resetUser, resetTrv: resetTrivia }, dispatch,
);

export default connect(null, mapDispatchToProps)(Feedback);
