import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testes pagina de login. Requisito 1 a 3', () => {
  
    it('Teste se a pagina de login é renderizada:', async () => {
        const { history } = renderWithRouterAndRedux(<App />);
        const emailTest = 'email@email.com';
        const nameTest = 'teste1';
        const headerLogin = screen.getByRole('heading', { name:/login/i})
        const name = screen.getByPlaceholderText( /insira seu nome/i );
        const email = screen.getByPlaceholderText( /insira seu email/i );
        const btnPlay = screen.getByRole('button',{ name: /play/i })
        const btnConfig = screen.getByRole('button', { name: /Configurações/i })
        
        expect(btnConfig).toBeInTheDocument();
        expect(btnPlay).toBeInTheDocument();
        expect(headerLogin).toBeInTheDocument();
        expect(name).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        
        
        userEvent.type(email, emailTest);
        userEvent.type(name, nameTest);
        userEvent.click(btnPlay);
        const { pathname } = history.location;
        await screen.findByRole('img');
        expect(pathname).toBe('/game');
        
        
        
        
       });
       
});
