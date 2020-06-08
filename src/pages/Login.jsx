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

  render() {
    const { enableButton } = this.state;
    return (
      <div className="row">
        <div className="col s12 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              {this.createInputPlayerName()}
              {this.createInputEmail()}
            </div>
            <div className="card-action">
              <button
                type="button"
                disabled={enableButton}
                className="waves-effect waves-light btn"
                data-testid="btn-play"
              >
                Play
              </button>
              <Link to="/settings" data-testid="btn-settings">
                <i className="material-icons">settings</i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;