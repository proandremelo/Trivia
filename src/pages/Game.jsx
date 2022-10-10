import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { triviaAPI } from '../redux/actions';

import Header from '../components/Header';

class Play extends Component {
  state = {
    indexQuestao: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const token = JSON.parse(localStorage.getItem('token'));
    dispatch(triviaAPI(token));
  }

  removeItem = () => {
    const { history } = this.props;
    localStorage.removeItem('token');
    history.push('/');
  };

  render() {
    const { isInvalid, perguntas } = this.props;
    const { indexQuestao } = this.state;
    console.log(perguntas);
    return (
      <div>
        { isInvalid && this.removeItem() }
        <Header />
        { perguntas.length > 0 && (
          <div>
            <h1 data-testid="question-category">{perguntas[indexQuestao].category}</h1>
            <h3 data-testid="question-text">{perguntas[indexQuestao].question}</h3>
            <div data-testid="answer-options">
              {
                [perguntas[indexQuestao].correct_answer, ...perguntas[indexQuestao]
                  .incorrect_answers].sort().map((elem, index) => (
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
  perguntas: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
  isInvalid: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  perguntas: state.perguntasReducer.perguntas,
  isInvalid: state.perguntasReducer.isInvalid,
});

export default connect(mapStateToProps)(Play);
