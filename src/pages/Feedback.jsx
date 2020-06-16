import React from 'react';
import { Link } from 'react-router-dom';
import TriviaHeader from '../components/TriviaHeader';

const linkSection = () => (
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
        className="waves-effect deep-orange btn margin-10p width-40"
      >
        PLAY AGAIN
      </Link>
    </div>
  </section>
);

const Feedback = () => {
  const state = localStorage.getItem('state')
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
          {linkSection()}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
