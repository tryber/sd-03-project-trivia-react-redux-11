import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const d = new Date();

class Ranking extends Component {
  render() {
    const rankedLadder = localStorage.getItem('ranking') !== null ? JSON.parse(localStorage.getItem('ranking')) : { ranking: { name: '', score: '', picture: '' } };
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ol>
          {rankedLadder.map(
            (ranking, index) => (
              <li key={`${d}`}>
                <div>
                  <img src={ranking.picture} alt={`${ranking.name}`} />
                  <span data-testid={`player-name-${index}`}>{`${ranking.name} `}</span>
                  <span data-testid={`player-score-${index}`}>{`${ranking.score}`}</span>
                  <span> pontos</span>
                </div>
              </li>
            ),
          )}
        </ol>
        <section>
          <Link
            data-testid="btn-go-home"
            to="/"
          >
            INÍCIO
            </Link>
        </section>
      </div>
    );
  }
}

export default Ranking;
