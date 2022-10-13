import { ADD_USER_INFO, ADD_SCORE, ADD_ACERTOS } from './actionTypes';

export const addUserInfo = (info) => ({ type: ADD_USER_INFO, info });

export const addPlacar = (placar) => ({ type: ADD_SCORE, placar });

export const addAcertos = (acertos) => ({ type: ADD_ACERTOS, acertos });
