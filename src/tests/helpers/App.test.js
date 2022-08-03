import React from "react"
import App from '../../App'
import { renderWithRouterAndRedux } from './renderWith'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Testando o Login', () => {
    it('Verifica os inputs e o botão do componente Login', () => {
        renderWithRouterAndRedux(<App />)

        const button = screen.getByRole("button", { name: /entrar/i });
        expect(button).toBeDisabled()

        const emailInput = screen.getByPlaceholderText(/digite seu email/i);
        userEvent.type(emailInput, 'teste@teste.com.br')

        const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);
        userEvent.type(passwordInput, '123456')
        userEvent.click(button)
        expect(button).toBeEnabled()

        expect(screen.getByText('teste@teste.com.br'))
        .toBeInTheDocument();
    })
})