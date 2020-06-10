import React from 'react';
import { connect } from 'react-redux';
import MD5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

const TriviaHeader = ({ score, name, gravatarEmail }) => {
  const trimmedAndLowercasedMail = gravatarEmail.trim().toLocaleLowerCase();
  return (
    <nav>
      <div className="black-coral-2 ">
        <img
          className="circle"
          style={{ width: '50px', verticalAlign: '-20px', marginLeft: '10px' }}
          src={`https://www.gravatar.com/avatar/${MD5(trimmedAndLowercasedMail)}`}
          alt="Gravatar profile"
          data-testid="header-profile-picture"
        />
        <ul className="right">
          <li>
            <span
              data-testid="header-player-name"
              className="margin-10p"
            >
              {`Jogador: ${name}`}
            </span>
          </li>
          <li>
            <span data-testid="header-score" className="margin-10p">
              Pontos: {score}
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ userReducer: { player: { score, name, gravatarEmail } } }) => ({
  score,
  name,
  gravatarEmail,
});

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
