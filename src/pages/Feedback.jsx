import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Header from '../components/Header';

class Feedback extends Component {
  FeedbackMSG = () => {
    const number = 3;
    const { acertos } = this.props;
    if (acertos < number) {
      return 'Could be better...';
    } if (acertos >= number) {
      return 'Well Done!';
    }
  };

  handleClick = () => {
    const { email, nome, score } = this.props;
    const getArray = JSON.parse(localStorage.getItem('player')) || [];
    console.log(getArray);

    const arrayInfo = { email, nome, score };
    const arrayStorage = [...getArray, arrayInfo];

    localStorage.setItem('player', JSON.stringify(arrayStorage));
  };

  render() {
    const { acertos, score } = this.props;
    return (
      <section>
        <Header />
        <h1>Feedback!</h1>
        <span data-testid="feedback-text">{this.FeedbackMSG()}</span>
        <span data-testid="feedback-total-score">{score}</span>
        <span data-testid="feedback-total-question">{acertos}</span>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">Play Again</button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.handleClick }
          >
            Ranking
          </button>
        </Link>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  acertos: state.player.assertions,
  score: state.player.score,
  email: state.player.gravatarEmail,
  nome: state.player.name,
});

Feedback.propTypes = {
  acertos: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
