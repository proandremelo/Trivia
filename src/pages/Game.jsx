import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import { addAcertos, addPlacar } from '../redux/actions';

const ONE_SECOND = 1000;
const GAME_TIME = 30;
const PONTO_CONSTANTE = 10;
const LAST_QUESTION_INDEX = 4;
const HARD = 3;
const MEDIUM = 2;
const EASY = 1;

class Game extends Component {
  state = {
    indexQuestao: 0,
    perguntas: [],
    // verified: false,
    time: GAME_TIME,
    clock: 0,
    // disableBtns: false,
    questionAnswered: false,
    acertos: 0,
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');
    await this.triviaAPI(token);
    this.createTimer();
  }

  createTimer = () => {
    const clock = setInterval(() => {
      this.setState({ clock });
      let { time } = this.state;
      if (time > 0) {
        time -= 1;
        this.setState({ time });
      }
      if (time <= 0) {
        // this.setState({ verified: true, disableBtns: true });
        this.setState({ questionAnswered: true });
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
      resposta.results.forEach((question) => {
        question.respostas = this.randomArray(question);
      });
      // console.log(resposta.results);
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
    let currentIndex = array.length;
    let randomIndex;

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

  randomArray = (pergunta) => this.shuffle([pergunta.correct_answer,
    ...pergunta.incorrect_answers]);

  somaPlacar = () => {
    const { time, perguntas, indexQuestao } = this.state;
    const { difficulty } = perguntas[indexQuestao];
    if (difficulty === 'hard') {
      return PONTO_CONSTANTE + (time * HARD);
    }
    if (difficulty === 'medium') {
      return PONTO_CONSTANTE + (time * MEDIUM);
    }
    if (difficulty === 'easy') {
      return PONTO_CONSTANTE + (time * EASY);
    }
  };

  clickQuestion = ({ target }) => {
    const { clock, acertos } = this.state;
    const { dispatch } = this.props;
    // this.setState({ verified: true, disableBtns: true });
    this.setState({ questionAnswered: true });
    clearInterval(clock);
    if (target.value === 'correct-answer') {
      const placar = this.somaPlacar();
      this.setState({
        acertos: acertos + 1,
      });
      dispatch(addPlacar(placar));
    }
  };

  clickNext = () => {
    const { indexQuestao, acertos } = this.state;
    const { dispatch, history } = this.props;
    if (indexQuestao === LAST_QUESTION_INDEX) {
      history.push('/feedback');
      dispatch(addAcertos(acertos));
    }
    this.setState((prevState) => ({
      indexQuestao: prevState.indexQuestao + 1,
      questionAnswered: false,
      time: GAME_TIME,
    }));
    this.createTimer();
  };

  render() {
    const { indexQuestao, perguntas, time, questionAnswered } = this.state;
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
                perguntas[indexQuestao].respostas.map((elem, index) => (
                  (elem === perguntas[indexQuestao].correct_answer)
                    ? (
                      <button
                        data-testid="correct-answer"
                        key={ elem }
                        type="button"
                        onClick={ this.clickQuestion }
                        value="correct-answer"
                        disabled={ questionAnswered }
                        style={ questionAnswered ? {
                          border: '3px solid rgb(6, 240, 15)' } : {} }
                      >
                        {elem}
                      </button>
                    )
                    : (
                      <button
                        data-testid={ `wrong-answer-${index}` }
                        key={ elem }
                        type="button"
                        onClick={ this.clickQuestion }
                        value="wrong-answer"
                        disabled={ questionAnswered }
                        style={ questionAnswered ? {
                          border: '3px solid red' } : {} }
                      >
                        {elem}
                      </button>
                    )
                ))
              }
              {
                questionAnswered && (
                  <button
                    type="button"
                    data-testid="btn-next"
                    onClick={ this.clickNext }
                  >
                    Next
                  </button>
                )
              }
            </div>
          </div>
        )}
      </div>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Game);
