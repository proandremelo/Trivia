import React, { Component } from 'react';

import Header from '../components/Header';

class Feedback extends Component {
  render() {
    return (
      <section>
        <Header />
        <h1>Feedback</h1>
        <span data-testid="feedback-text">Text</span>
      </section>
    );
  }
}

export default Feedback;
