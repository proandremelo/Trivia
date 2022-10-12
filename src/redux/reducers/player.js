import { ADD_USER_INFO, ADD_SCORE } from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '', // nome-da-pessoa,
  assertions: '', // número-de-acertos,
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
  default:
    return state;
  }
};

export default player;
