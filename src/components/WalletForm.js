import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { selectCoins, valueFromInput } from '../redux/actions';
import getEconomyCoins from '../services/economyAPI';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: '',
    };
  }

  async componentDidMount() {
    const { saveCoins } = this.props;
    const data = await getEconomyCoins();
    const coins = Object.keys(data).filter((coin) => coin !== 'USDT');
    saveCoins(coins);
  }

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState(({
      [name]: target.value,
    }));
  }

  handleClick = async () => {
    const { setExpenses } = this.props;
    const response = await getEconomyCoins();
    this.setState({ exchangeRates: response });
    setExpenses(this.state);
    this.setState((prev) => ({
      id: prev.id + 1,
    }));
    this.setState({ value: '', description: '' });
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <>
        <form>
          <label htmlFor="expenses">
            Despesas
            <input
              data-testid="value-input"
              id="expenses"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Descrição
            <input
              data-testid="description-input"
              id="description"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="options-coins">
            <select
              data-testid="currency-input"
              id="options-coins"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              { currencies.map((coin) => (
                <option
                  key={ coin }
                  value={ coin }
                >
                  { coin }
                </option>))}
            </select>
          </label>
          <label htmlFor="select-method">
            <select
              data-testid="method-input"
              id="select-method"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="select-category">
            <select
              data-testid="tag-input"
              id="select-category"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </form>
        <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
      </>
    );
  }
}
const mapStateToProps = (store) => ({
  currencies: store.wallet.currencies,
  expenses: store.wallet.expenses,
});
const mapDispatchToProps = (dispatch) => ({
  saveCoins: (payload) => dispatch(selectCoins(payload)),
  setExpenses: (expenses) => dispatch(valueFromInput(expenses)),
});

WalletForm.propTypes = {
  saveCoins: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  setExpenses: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
