import React from 'react';

const Login = () => {
  return (
    <div>
      <form action="">
        <label htmlFor="input-player-name">Nome:</label>
        <input type="text" name="input-player-name" data-testid="input-player-name" />
        <label htmlFor="input-gravatar-email">email</label>
        <input type="text" name="input-gravatar-email" data-testid="input-gravatar-email"/>
        <button data-testid="btn-play" disabled="true">Jogar</button>
      </form>
    </div>
  );
}

export default Login;
