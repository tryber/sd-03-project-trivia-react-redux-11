import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import resetUser from '../actions/resetUser';
import resetTrivia from '../actions/resetTrivia';
import RankLine from '../components/RankLine';

const d = new Date();

class Ranking extends Component {
  render() {
    const rankedLadder = localStorage.getItem('ranking') !== null ? JSON.parse(localStorage.getItem('ranking')) : { ranking: { name: '', score: '', picture: '' } };
    const { resetUsr, resetTrv } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ol>
          {rankedLadder.map(
            (ranking, index) => <RankLine key={d} ranking={ranking} index={index} />,
          ).sort((rankA, rankB) => rankB.props.ranking.score - rankA.props.ranking.score)}
        </ol>
        <section>
          <Link
            data-testid="btn-go-home"
            to="/"
            onClick={() => {
              resetUsr();
              resetTrv();
            }}
          >
            INÍCIO
          </Link>
        </section>
      </div>
    );
  }
}

Ranking.propTypes = {
  resetUsr: PropTypes.func.isRequired,
  resetTrv: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => bindActionCreators(
  { resetUsr: resetUser, resetTrv: resetTrivia }, dispatch,
);

export default connect(null, mapDispatchToProps)(Ranking);
