import { INVALID_TOKEN, PERGUNTAS_API } from '../actions/actionTypes';

const INITIAL_STATE = {
  perguntas: [],
  isInvalid: false,
};

const perguntasAPI = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PERGUNTAS_API:
    return {
      ...state,
      perguntas: action.payload.results,
      isInvalid: false,
    };
  case INVALID_TOKEN:
    return {
      ...state,
      perguntas: action.payload.results,
      isInvalid: true,
    };
  default:
    return state;
  }
};

export default perguntasAPI;
