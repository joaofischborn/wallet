import React from "react";
import App from '../../App';

import { screen } from "@testing-library/react";
import { renderWithRouterAndRedux } from '../helpers/renderWith';

import userEvent from "@testing-library/user-event";

describe('Testando o componente Login', ()=>{

   it('Testa se o campo de email e senha aparecem na tela', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByPlaceholderText(/digite seu email/i);
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);
    expect(passwordInput).toBeInTheDocument();

    const buttonLogIn = screen.getByRole('button', { name: /entrar/i, });
    expect(buttonLogIn).toBeInTheDocument();

   }) 
   
   it('Verifica se o botão é habilitado as preencher os inputs', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByPlaceholderText(/digite seu email/i);
    userEvent.type(emailInput,'teste@teste.com')

    const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);
    userEvent.type(passwordInput, '123456')

    const buttonLogIn = screen.getByRole('button', { name: /entrar/i, });
    userEvent.click(buttonLogIn)

    expect(history.location.pathname).toBe('/carteira')

   })
});

describe('Testando o componente Wallet', () => {

   it('Verifica se os inputs de Wallet estão na tela', async () => {
   const { history }= renderWithRouterAndRedux(<App />);
   history.push('/carteira')
    
   const expense = screen.getByLabelText(/despesa/i);
   expect(expense).toBeInTheDocument()

   const description = screen.getByLabelText(/descrição/i);
   expect(description).toBeInTheDocument()

   const coin = screen.getByLabelText(/moeda/i);
   expect(coin).toBeInTheDocument()

   const paymentMethod = screen.getByLabelText(/método de pagamento/i);
   expect(paymentMethod).toBeInTheDocument()

   const category = screen.getByLabelText(/categoria/i);
   expect(category).toBeInTheDocument()

   const buttonAdd = screen.getByRole('button', { name: /adicionar despesa/i, })

   userEvent.type(expense, 1)
   userEvent.click(buttonAdd)

   const buttonDelete = await screen.findByRole("button", { name: /excluir/i });
   expect(buttonDelete).toBeInTheDocument()

   })
})