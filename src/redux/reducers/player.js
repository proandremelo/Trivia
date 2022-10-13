import { ADD_USER_INFO, ADD_SCORE, ADD_ACERTOS } from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '', // nome-da-pessoa,
  assertions: 0, // número-de-acertos,
  score: 0, // pontuação,
  gravatarEmail: '', // email-da-pessoa,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER_INFO:
    return {
      ...state,
      name: action.info.name,
      gravatarEmail: action.info.email,
    };
  case ADD_SCORE:
    return {
      ...state,
      score: state.score + action.placar,
    };
  case ADD_ACERTOS:
    return {
      ...state,
      assertions: state.assertions + action.acertos,
    };
  default:
    return state;
  }
};

export default player;
