import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addUserInfo, fetchAPI } from '../redux/actions';

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

  handleClick = () => {
    const { dispatch, history } = this.props;
    const { name, email } = this.state;
    const info = {
      name,
      email,
    };
    dispatch(addUserInfo(info));
    dispatch(fetchAPI());
    // const token = JSON.parse(localStorage.getItem('token'));
    // dispatch(triviaAPI(token));
    // this.setState({
    //   redirect: true,
    // });
    history.push('/game');
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isInvalid: state.perguntasReducer.isInvalid,
});

export default connect(mapStateToProps)(Login);
