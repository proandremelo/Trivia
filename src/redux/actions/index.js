import { ADD_USER_INFO } from './actionTypes';

export const addUserInfo = (info) => ({ type: ADD_USER_INFO, info });

const setLocalStorage = (param) => {
  localStorage.setItem('token', param.token);
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
