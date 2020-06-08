import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputPlayerName: '',
      inputGravatarEmail: '',
      enableButton: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.createInputPlayerName = this.createInputPlayerName.bind(this);
    this.createInputEmail = this.createInputEmail.bind(this);
    this.cardButtons = this.cardButtons.bind(this);
  }

  async handleChange(e) {
    await this.setState({
      [e.target.id]: e.target.value,
    });
    const { inputPlayerName, inputGravatarEmail } = this.state;
    if (inputPlayerName && inputGravatarEmail) {
      this.setState({ enableButton: false });
    } else {
      this.setState({ enableButton: true });
    }
  }

  createInputPlayerName() {
    const { inputPlayerName } = this.state;
    return (
      <span>
        <input
          value={inputPlayerName}
          onChange={(e) => this.handleChange(e)}
          required
          type="text"
          id="inputPlayerName"
          name="inputPlayerName"
          data-testid="input-player-name"
        />
        <label htmlFor="inputPlayerName">Name</label>
      </span>
    );
  }

  createInputEmail() {
    const { inputGravatarEmail } = this.state;
    return (
      <span>
        <input
          value={inputGravatarEmail}
          onChange={(e) => this.handleChange(e)}
          required
          type="text"
          id="inputGravatarEmail"
          name="inputGravatarEmail"
          data-testid="input-gravatar-email"
        />
        <label htmlFor="inputGravatarEmail">E-Mail</label>
      </span>
    );
  }

  cardButtons() {
    const { enableButton } = this.state;
    return (
      <div className="card-action">
        <div className="row">
          <button
            type="button"
            disabled={enableButton}
            className="waves-effect grey darken-3 btn col s4 offset-s4"
            data-testid="btn-play"
          >
            Play
          </button>
          <Link
            to="/settings"
            data-testid="btn-settings valign-wrapper"
            className="col offset-s2 s1"
          >
            <i className="material-icons" style={{ verticalAlign: '-12px' }}>
              settings
            </i>
          </Link>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="row">
        <div className="col s6 offset-s3">
          <div className="card grey darken-3">
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

export default Login;
