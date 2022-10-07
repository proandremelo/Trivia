import React from 'react';
import { Link } from 'react-router-dom';

const { connect } = require('react-redux');

class Login extends React.Component {
  state = {
    btnDisable: true,
    name: '',
    email: '',
  };

  // handleClick = () => {
  //   const { history } = this.props;
  //   history.push('/config');
  // };

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

          <Link to="/config">
            <button
              type="button"
              data-testid="btn-settings"
            // onClick={ this.handleClick }
            >

              Configurações
            </button>
          </Link>
        </form>
      </section>
    );
  }
}

export default connect()(Login);
