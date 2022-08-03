import React from "react";
import App from '../../App'

import { renderWithRouterAndRedux } from "../helpers/renderWith";
import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

describe('Testando o componente APP', () => {
  it('Verifica a página de login na tela', () => {
    renderWithRouterAndRedux(<App />);

    const loginInput = screen.getByPlaceholderText(/digite seu email/i);
    userEvent.type(loginInput, 'teste@teste.com.br');

    const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);
    userEvent.type(passwordInput, '1234567');


    const button = screen.getByRole('button', {name: /Entrar/i });
    userEvent.click(button);

    const email = screen.getByText('teste@teste.com.br')
    expect(email).toBeInTheDocument()
  });
});