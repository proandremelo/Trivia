import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header';

class Play extends Component {
  state = {
    indexQuestao: 0,
    perguntas: [],
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');
    await this.triviaAPI(token);
  }

  triviaAPI = async (token) => {
    const { history } = this.props;
    const erro = 3;
    try {
      const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
      const request = await fetch(url);
      const resposta = await request.json();
      if (resposta.response_code === erro) {
        localStorage.removeItem('token');
        history.push('/');
      }
      this.setState({
        perguntas: resposta.results,
      });
    } catch (error) {
      return error;
    }
  };

  // função retirada diretamente do stack overflow
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

  shuffle = (array) => {
    let currentIndex = array.length; let
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
    // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  };

  render() {
    const { indexQuestao, perguntas } = this.state;
    return (
      <div>
        <Header />
        { perguntas.length > 0 && (
          <div>
            <h1 data-testid="question-category">{perguntas[indexQuestao].category}</h1>
            <h3 data-testid="question-text">{perguntas[indexQuestao].question}</h3>
            <div data-testid="answer-options">
              {
                this.shuffle([perguntas[indexQuestao].correct_answer,
                  ...perguntas[indexQuestao].incorrect_answers]).map((elem, index) => (
                  (elem === perguntas[indexQuestao].correct_answer)
                    ? (
                      <button data-testid="correct-answer" key={ index } type="button">
                        {elem}
                      </button>
                    )
                    : (
                      <button
                        data-testid={ `wrong-answer-${index}` }
                        key={ index }
                        type="button"
                      >
                        {elem}
                      </button>
                    )
                ))
              }
            </div>
          </div>
        )}
      </div>
    );
  }
}

Play.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Play);
