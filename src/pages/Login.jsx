import React from 'react';

const { connect } = require('react-redux');

class Login extends React.Component {
  state = {
    btnDisable: true,
    name: '',
    email: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validateInput);
  };

  validateInput = () => {
    const { name, email } = this.state;
    this.setState({ btnDisable: !(name.length > 0 && email.length > 0) });
  };

  render() {
    const { btnDisable, name, email } = this.state;
    return (
      <section>
        <h1>Login</h1>
        <form>
          <label htmlFor="name">
            <input
              type="text"
              name="name"
              data-testid="input-player-name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            <input
              type="text"
              name="email"
              data-testid="input-gravatar-email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ btnDisable }
          >
            Play
          </button>
          <button type="button">
            Configurações
          </button>
        </form>
      </section>
    );
  }
}

export default connect()(Login);
