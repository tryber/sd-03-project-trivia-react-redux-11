import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchToken from '../actions/fetchToken';
import changeUserInfo from '../actions/changeUserInfo';
import resetTrivia from '../actions/resetTrivia';
import fetchTrivia from '../actions/fetchTrivia';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      gravatarEmail: '',
      enableButton: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.createInputPlayerName = this.createInputPlayerName.bind(this);
    this.createInputEmail = this.createInputEmail.bind(this);
    this.cardButtons = this.cardButtons.bind(this);
    this.fetchs = this.fetchs.bind(this);
  }

  componentDidMount() {
    const { resetTrv } = this.props;
    resetTrv();
  }

  async handleChange(e) {
    await this.setState({
      [e.target.id]: e.target.value,
    });
    const { name, gravatarEmail } = this.state;
    if (name && gravatarEmail) {
      this.setState({ enableButton: false });
    } else {
      this.setState({ enableButton: true });
    }
  }

  createInputPlayerName() {
    const { name } = this.state;
    return (
      <span>
        <input
          className="white-text"
          value={name}
          onChange={(e) => this.handleChange(e)}
          required
          type="text"
          id="name"
          name="inputPlayerName"
          data-testid="input-player-name"
        />
        <label htmlFor="inputPlayerName">Name</label>
      </span>
    );
  }

  createInputEmail() {
    const { gravatarEmail } = this.state;
    return (
      <span>
        <input
          className="white-text"
          value={gravatarEmail}
          onChange={(e) => this.handleChange(e)}
          required
          type="text"
          id="gravatarEmail"
          name="gravatarEmail"
          data-testid="input-gravatar-email"
        />
        <label htmlFor="gravatarEmail">E-Mail</label>
      </span>
    );
  }

  async fetchs() {
    const { fetchTkn, fetchTrv, category, difficulty, type } = this.props;
    await fetchTkn().then((token) => localStorage.setItem('token', JSON.stringify(token.payload)));
    const { token } = JSON.parse(localStorage.getItem('token'));
    fetchTrv(token, category, difficulty, type);
  }

  cardButtons() {
    const { changeUser } = this.props;
    const { enableButton, name, gravatarEmail } = this.state;
    return (
      <div className="row">
        <Link to="/game">
          <button
            type="button"
            onClick={() => {
              changeUser(name, gravatarEmail);
              this.fetchs();
            }}
            disabled={enableButton}
            className="waves-effect deep-orange btn col s4 offset-s4"
            data-testid="btn-play"
          >
            Play
          </button>
        </Link>
        <Link to="/settings" data-testid="btn-settings" className="col offset-s3 s1">
          <i className="material-icons deep-orange-text" style={{ verticalAlign: '-12px' }}>
            settings
          </i>
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div className="row">
        <div className="col s6 offset-s3">
          <div className="card black-coral radius-border-10">
            <div className="card-content white-text">
              {this.createInputPlayerName()}
              {this.createInputEmail()}
              {this.cardButtons()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  changeUser: PropTypes.func.isRequired,
  resetTrv: PropTypes.func.isRequired,
  fetchTkn: PropTypes.func.isRequired,
  fetchTrv: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.tokenReducer.token.token,
  tokenIsFetching: state.tokenReducer.tokenIsFetching,
  gameIsFetching: state.gameReducer.gameIsFetching,
  responseCode: state.gameReducer.trivia.response_code,
  results: state.gameReducer.trivia.results,
  player: state.userReducer.player,
  category: state.settingReducer.category,
  difficulty: state.settingReducer.difficulty,
  type: state.settingReducer.type,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    fetchTkn: fetchToken,
    fetchTrv: fetchTrivia,
    changeUser: changeUserInfo,
    resetTrv: resetTrivia,
  }, dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
