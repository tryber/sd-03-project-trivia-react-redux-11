import React from 'react';

const RankLine = ({ index, ranking }) => (
  <li>
    <div>
      <img src={ranking.picture} alt={ranking.name} />
      <span data-testid={`player-name-${index}`}>{ranking.name}</span>
      <span>pontuou</span>
      <span data-testid={`player-score-${index}`}>{ranking.score}</span>
    </div>
  </li>
);

export default RankLine;
