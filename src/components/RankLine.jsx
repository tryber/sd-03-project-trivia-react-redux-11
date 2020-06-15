import React from 'react';
import PropTypes from 'prop-types';

const RankLine = ({ index, ranking }) => (
  <li>
    <div>
      <img
        src={ranking.picture}
        alt={ranking.name}
        className="circle"
        style={{ width: '50px', verticalAlign: '-20px', margin: '10px' }}
      />
      <span data-testid={`player-name-${index}`}>{ranking.name}</span>
      <span> did </span>
      <span data-testid={`player-score-${index}`}>{ranking.score}</span>
      <span> points.</span>
    </div>
  </li>
);

RankLine.propTypes = {
  index: PropTypes.number.isRequired,
  ranking: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default RankLine;
