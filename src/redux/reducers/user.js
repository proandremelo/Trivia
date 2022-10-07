import { ADD_USER_INFO } from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '', // nome-da-pessoa,
  assertions: '', // número-de-acertos,
  score: '', // pontuação,
  gravatarEmail: '', // email-da-pessoa,
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER_INFO:
    return {
      ...state,
      name: action.info.name,
      gravatarEmail: action.info.email,
    };
  default:
    return state;
  }
};

export default user;
