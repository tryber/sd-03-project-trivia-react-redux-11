import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputPlayerName: '',
      inputGravatarEmail: '',
      enableButton: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(e) {
    await this.setState({
      [e.target.id]: e.target.value,
    });
    if (this.state.inputPlayerName && this.state.inputGravatarEmail) {
      this.setState({ enableButton: false });
    } else {
      this.setState({ enableButton: true });
    }
  }

  render() {
    const { enableButton, inputPlayerName, inputGravatarEmail } = this.state;
    return (
      <div className="row">
        <div className="col s12 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <label htmlFor="inputPlayerName">Nome:</label>
              <input
                value={inputPlayerName}
                onChange={(e) => this.handleChange(e)}
                required
                type="text"
                id="inputPlayerName"
                name="inputPlayerName"
                data-testid="input-player-name"
              />
              <label htmlFor="inputGravatarEmail">e-mail</label>
              <input
                value={inputGravatarEmail}
                onChange={(e) => this.handleChange(e)}
                required
                type="text"
                id="inputGravatarEmail"
                name="inputGravatarEmail"
                data-testid="input-gravatar-email"
              />
            </div>
            <div className="card-action">
              <button
                disabled={enableButton}
                className="waves-effect waves-light btn"
                data-testid="btn-play"
              >
                Jogar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
