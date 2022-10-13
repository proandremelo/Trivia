import React from 'react';
import { fireEvent, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import Game from '../pages/Game';

// const localStorageMock = (function () {
//   let store = {};

//   return {
//     getItem(key) {
//       return store[key];
//     },

//     setItem(key, value) {
//       store[key] = value;
//     },

//     clear() {
//       store = {};
//     },

//     removeItem(key) {
//       delete store[key];
//     },

//     getAll() {
//       return store;
//     },
//   };
// })();

// Object.defineProperty(window, 'localStorage', { value: localStorageMock }); 

describe('Testes da pagina de login.', () => {
    it('Teste se a pagina de login é renderizada corretamente:', async () => {
        renderWithRouterAndRedux(<App />);
        const headerLogin = screen.getByRole('heading', { name:/login/i});
        const name = screen.getByPlaceholderText( /insira seu nome/i );
        const email = screen.getByPlaceholderText( /insira seu email/i );
        const btnPlay = screen.getByRole('button',{ name: /play/i });
        const btnConfig = screen.getByRole('button', { name: /configurações/i });
        
        expect(btnConfig).toBeInTheDocument();
        expect(btnPlay).toBeInTheDocument();
        expect(headerLogin).toBeInTheDocument();
        expect(name).toBeInTheDocument();
        expect(email).toBeInTheDocument();       
    });

    it('Testa se botão Play fica desabilitado caso não exista o input apropriado', () => {
        renderWithRouterAndRedux(<App />);
        const btnPlay = screen.getByRole('button',{ name: /play/i });
        const name = screen.getByPlaceholderText('insira seu nome');
        const email = screen.getByPlaceholderText('insira seu email');

        expect(name).toHaveValue('');
        expect(email).toHaveValue('');
        expect(btnPlay).toBeDisabled();
    });
       
    it('Testa se clicado no botão Play muda para route game, enquanto estiver habilitado', async () => {
        const { history } = renderWithRouterAndRedux(<App />);
        const btnPlay = await screen.findByRole('button',{ name: /play/i });
        const name = screen.getByPlaceholderText('insira seu nome');
        const email = screen.getByPlaceholderText('insira seu email');
        const emailTest = 'email@email.com';
        const nameTest = 'teste1';

        userEvent.type(name, nameTest);
        userEvent.type(email, emailTest);
        
        expect(name).toHaveValue(nameTest);
        expect(email).toHaveValue(emailTest);
        expect(btnPlay).not.toBeDisabled();
        
        fireEvent.click(btnPlay);
        await waitForElementToBeRemoved(btnPlay);
        const { pathname  } = history.location;        
        expect(pathname).toBe('/game');
        const gravatarImg = screen.getByRole('img');
        expect(gravatarImg).toBeInTheDocument();
    });
    
    // it('Testa se o token está no local storage', () => {
    //     const setLocalStorage = (id, data) => {
    //         window.localStorage.setItem(id, JSON.stringify(data));
    //         };
    //     const mockId = "token";
    //     const mockJson = { data: "" };
    //     setLocalStorage(mockId, mockJson);
    //     expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockJson));
    // });

    it('Teste se quando clicado no botão Configuração muda para o route config', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        const btnConfig = screen.getByRole('button', { name: /configurações/i });

        expect(btnConfig).toBeInTheDocument();

        userEvent.click(btnConfig);
        const { pathname } = history.location;

        expect(pathname).toBe('/config');

        const configHeading = screen.getByRole('heading', { name: /pagina config/i, level: 1 });

        expect(configHeading).toBeInTheDocument();
    });
});
