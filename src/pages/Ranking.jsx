import React from 'react';
import { Link } from 'react-router-dom';
import RankLine from '../components/RankLine';

const Ranking = () => {
  const rankedLadder = localStorage.getItem('ranking') !== null
    ? JSON.parse(localStorage.getItem('ranking'))
    : { ranking: { name: '', score: '', picture: '' } };
  return (
    <div className="row">
      <div className="col s4 offset-s4 white-text black-coral">
        <header className="center-align">
          <h1 data-testid="ranking-title">Ranking</h1>
        </header>
        <ol>
          {rankedLadder
            .map((ranking, index) => (
              <RankLine key={ranking.date} ranking={ranking} index={index} />
            ))
            .sort((rankA, rankB) => rankB.props.ranking.score - rankA.props.ranking.score)}
        </ol>
        <section className="center-align margin-10p">
          <Link
            data-testid="btn-go-home"
            to="/"
            className="waves-effect deep-orange btn margin-10p width-40"
          >
            BACK
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Ranking;
