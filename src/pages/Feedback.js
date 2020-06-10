import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TriviaHeader from '../components/TriviaHeader';

class Feedback extends Component {
  render() {
    const state = (localStorage.getItem('state') !== null) ? JSON.parse(localStorage.getItem('state')) : { player: { assertions: '', score: '' } };
    const { assertions, score } = state.player;
    const answerTitle = assertions >= 3 ? 'Mandou bem!' : 'Podia ser melhor...';
    return (
      <div>
        <header><TriviaHeader /></header>
        <h2 data-testid="feedback-text">{answerTitle}</h2>
        <h3 data-testid="feedback-total-question">{`Você acertou ${assertions || 0} questões!`}</h3>
        <h3 data-testid="feedback-total-score">{`Um total de ${score || 0} pontos`}</h3>
        <section>
          <div>
            <Link
              data-testid="btn-ranking"
              to="/ranking"
            >
              VER RANKING
            </Link>
          </div>
          <div>
            <Link
              data-testid="btn-play-again"
              to="/"
             >
              JOGAR NOVAMENTE
            </Link>
          </div>
        </section>
      </div>
    );
  }
}

export default connect(null)(Feedback);
