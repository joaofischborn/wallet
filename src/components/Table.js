import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeGlobalState } from '../redux/actions';

class Table extends Component {
  handleDeleteClick = (expense) => {
    const { clearStore } = this.props;
    clearStore(expense);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        { expenses.map((expense) => (
          <tbody key={ expense.id }>
            <tr>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{Number(expense.value).toFixed(2)}</td>
              <td>{expense.exchangeRates[expense.currency].name}</td>
              <td>{(expense.exchangeRates[expense.currency].ask * 1).toFixed(2)}</td>
              <td>
                {((expense.value) * expense
                  .exchangeRates[expense.currency].ask * 1).toFixed(2)}

              </td>
              <td>Real</td>
              <td>
                <button
                  data-testid="delete-btn"
                  id={ expense.id }
                  onClick={ () => this.handleDeleteClick(expense) }
                  type="button"
                >
                  Excluir

                </button>
              </td>
            </tr>
          </tbody>))}
      </table>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});
const mapDispatchToProps = (dispatch) => ({
  clearStore: (clear) => dispatch(removeGlobalState(clear)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  clearStore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
