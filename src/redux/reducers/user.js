const INITIAL_STATE = {
  name: '', // nome-da-pessoa,
  assertions: '', // número-de-acertos,
  score: '', // pontuação,
  gravatarEmail: '', // email-da-pessoa,
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

export default user;
