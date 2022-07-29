import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { selectCoins } from '../redux/actions';
import getEconomyCoins from '../services/economyAPI';

class WalletForm extends Component {
  async componentDidMount() {
    const { saveCoins } = this.props;
    const data = await getEconomyCoins();
    const coins = Object.keys(data).filter((coin) => coin !== 'USDT');
    saveCoins(coins);
  }

  render() {
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="expenses">
          Despesas
          <input data-testid="value-input" id="expenses" />
        </label>
        <label htmlFor="description">
          Descrição
          <input data-testid="description-input" id="description" />
        </label>
        <label htmlFor="options-coins">
          <select data-testid="currency-input" id="options-coins">
            { currencies.map((currency) => (
              <option
                key={ currency }
                value={ currency }
              >
                { currency }
              </option>))}
          </select>
        </label>
        <label htmlFor="select-method">
          <select data-testid="method-input" id="select-method">
            <option value="dinheiro">Dinheiro</option>
            <option value="cartao-credito">Cartão de crédito</option>
            <option value="cartao-debito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="select-category">
          <select data-testid="tag-input" id="select-category">
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}
const mapStateToProps = (store) => ({
  currencies: store.wallet.currencies,
});
const mapDispatchToProps = (dispatch) => ({
  saveCoins: (payload) => dispatch(selectCoins(payload)),
});

WalletForm.propTypes = {
  saveCoins: PropTypes.func.isRequired,
  currencies: PropTypes.string.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
