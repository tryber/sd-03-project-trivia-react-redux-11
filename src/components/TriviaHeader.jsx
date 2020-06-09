import React from 'react';
import { connect } from 'react-redux';
import MD5 from 'crypto-js/md5';
import PropTypes from 'prop-types';


const TriviaHeader = ({ score, name, gravatarEmail }) => {
  const trimmedAndLowercasedMail = gravatarEmail.trim().toLocaleLowerCase();
  return (
    <div>
      <img
        className="circle"
        src={`https://www.gravatar.com/avatar/${MD5(trimmedAndLowercasedMail)}`}
        alt="Gravatar profile"
        data-testid="header-profile-picture"
      />
      <h1 data-testid="header-player-name">{`Jogador: ${name}`}</h1>
      <h2>
        Pontos:
        <span data-testid="header-score">{score}</span>
      </h2>
    </div>
  );
};

const mapStateToProps = ({ userReducer: { score, name, gravatarEmail } }) => (
  { score, name, gravatarEmail }
);


export default connect(mapStateToProps)(TriviaHeader);

TriviaHeader.propTypes = {
  score: PropTypes.number,
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
};

TriviaHeader.defaultProps = {
  score: 0,
  name: '',
  gravatarEmail: '',
};
