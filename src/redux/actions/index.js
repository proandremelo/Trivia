import { ADD_USER_INFO, PERGUNTAS_API, INVALID_TOKEN } from './actionTypes';

export const addUserInfo = (info) => ({ type: ADD_USER_INFO, info });

export const perguntasAPI = (payload) => ({ type: PERGUNTAS_API, payload });

export const invalidToken = (payload) => ({ type: INVALID_TOKEN, payload });

const setLocalStorage = (param) => {
  localStorage.setItem('token', JSON.stringify(param.token));
};

export const triviaAPI = (token) => async (dispatch) => {
  try {
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const request = await fetch(url);
    const resposta = await request.json();
    if (resposta.response_code === 0) {
      dispatch(perguntasAPI(resposta));
    } else {
      dispatch(invalidToken(resposta));
    }
  } catch (error) {
    return error;
  }
};

export const fetchAPI = () => async () => {
  try {
    const tokenRequest = 'https://opentdb.com/api_token.php?command=request';
    const request = await fetch(tokenRequest);
    const resposta = await request.json();
    setLocalStorage(resposta);
  } catch (error) {
    return error;
  }
};
