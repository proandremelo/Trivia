import React from 'react';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
import { number, string } from 'prop-types';

class Header extends React.Component {
  render() {
    const { name, email, score } = this.props;
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
          { score }
        </span>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

Header.propTypes = {
  name: string.isRequired,
  email: string.isRequired,
  score: number.isRequired,
};

export default connect(mapStateToProps)(Header);
