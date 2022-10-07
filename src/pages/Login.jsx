import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import fetchAPI from '../redux/actions';
import { Link } from 'react-router-dom';

const { connect } = require('react-redux');

class Login extends React.Component {
  state = {
    btnDisable: true,
    name: '',
    email: '',
    redirect: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validateInput);
  };

  validateInput = () => {
    const { name, email } = this.state;
    this.setState({ btnDisable: !(name.length > 0 && email.length > 0) });
  };

  handleClick = () => {
    const { dispatch } = this.props;
    dispatch(fetchAPI());
    this.setState({
      redirect: true,
    });
  };

  render() {
    const { btnDisable, name, email, redirect } = this.state;
    return (
      <section>
        {redirect && <Redirect to="/play" />}
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
            onClick={ this.handleClick }
          >
            Play
          </button>
          <Link to="/config">
            <button
              type="button"
              data-testid="btn-settings"
            >
              Configurações
            </button>
          </Link>
        </form>
      </section>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
