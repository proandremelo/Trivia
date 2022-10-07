import React from 'react';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
import { string } from 'prop-types';

class Header extends React.Component {
  render() {
    const { name, email } = this.props;
    const site = 'https://www.gravatar.com/avatar/';
    const src = `${site}${MD5(email).toString()}`;
    return (
      <section>
        <img
          src={ src }
          alt="gravatar"
          data-testid="header-profile-picture"
        />
        <span
          data-testid="header-player-name"
        >
          { name }
        </span>
        <span
          data-testid="header-score"
        >
          0
        </span>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.gravatarEmail,
});

Header.propTypes = {
  name: string.isRequired,
  email: string.isRequired,
};

export default connect(mapStateToProps)(Header);
