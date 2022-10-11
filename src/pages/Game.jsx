import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header';

const GAME_TIME = 30;
const ONE_SECOND = 1000;

class Play extends Component {
  state = {
    indexQuestao: 0,
    perguntas: [],
    verified: false,
    time: GAME_TIME,
    verifyRandom: true,
    clock: 0,
    disableBtns: false,
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');
    await this.triviaAPI(token);
    this.createTimer();
  }

  randomFalse = () => {
    this.setState({ verifyRandom: false });
  };

  randomTrue = () => {
    this.setState({ verifyRandom: true });
  };

  createTimer = () => {
    const clock = setInterval(() => {
      this.setState({ clock });
      let { time } = this.state;
      if (time > 0) {
        this.randomFalse();
        time -= 1;
        this.setState({ time });
      }
      if (time <= 0) {
        this.setState({ verified: true, disableBtns: true });
        this.randomTrue();
        clearInterval(clock);
      }
    }, ONE_SECOND);
  };

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

  randomArray = (perguntas, indexQuestao) => {
    const { verifyRandom } = this.state;
    console.log(verifyRandom);
    if (verifyRandom) {
      const random = this.shuffle([perguntas[indexQuestao].correct_answer,
        ...perguntas[indexQuestao].incorrect_answers]);
      return random;
    }
    return [perguntas[indexQuestao].correct_answer,
      ...perguntas[indexQuestao].incorrect_answers];
  };

  clickQuestion = () => {
    const { clock } = this.state;
    this.randomTrue();
    this.setState({ verified: true, disableBtns: true });
    clearInterval(clock);
  };

  render() {
    const { indexQuestao, perguntas, verified, time, disableBtns } = this.state;
    return (
      <div>
        <Header />
        <span>{ time }</span>
        { perguntas.length > 0 && (
          <div>
            <h1 data-testid="question-category">{perguntas[indexQuestao].category}</h1>
            <h3 data-testid="question-text">{perguntas[indexQuestao].question}</h3>
            <div data-testid="answer-options">
              {
                this.randomArray(perguntas, indexQuestao).map((elem, index) => (
                  (elem === perguntas[indexQuestao].correct_answer)
                    ? (
                      <button
                        data-testid="correct-answer"
                        key={ index }
                        type="button"
                        onClick={ this.clickQuestion }
                        value="correct-answer"
                        disabled={ disableBtns }
                        style={ verified ? {
                          border: '3px solid rgb(6, 240, 15)' } : {} }
                      >
                        {elem}
                      </button>
                    )
                    : (
                      <button
                        data-testid={ `wrong-answer-${index}` }
                        key={ index }
                        type="button"
                        onClick={ this.clickQuestion }
                        value="wrong-answer"
                        disabled={ disableBtns }
                        style={ verified ? {
                          border: '3px solid red' } : {} }
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
