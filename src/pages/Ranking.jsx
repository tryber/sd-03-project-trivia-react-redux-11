import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import resetUser from '../actions/resetUser';
import resetTrivia from '../actions/resetTrivia';
import RankLine from '../components/RankLine';

const Ranking = ({ resetUsr, resetTrv }) => {
  const rankedLadder =
    localStorage.getItem('ranking') !== null
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
            className={'waves-effect deep-orange btn margin-10p width-40'}
            onClick={() => {
              resetUsr();
              resetTrv();
            }}
          >
            BACK
          </Link>
        </section>
      </div>
    </div>
  );
};

Ranking.propTypes = {
  resetUsr: PropTypes.func.isRequired,
  resetTrv: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ resetUsr: resetUser, resetTrv: resetTrivia }, dispatch);

export default connect(null, mapDispatchToProps)(Ranking);
