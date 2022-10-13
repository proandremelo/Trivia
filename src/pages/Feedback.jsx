import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

  render() {
    return (
      <section>
        <Header />
        <h1>Feedback</h1>
        <span data-testid="feedback-text">{this.FeedbackMSG()}</span>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  acertos: state.player.assertions,
});

Feedback.propTypes = {
  acertos: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
