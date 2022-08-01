import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
sumValues = () => {
  const { expenses } = this.props;
  const getSum = expenses.reduce((acc, curr) => (acc + Number(curr.value)
   * Number(curr.exchangeRates[curr.currency].ask)), 0).toFixed(2);
  return getSum;
}

render() {
  const { userEmail } = this.props;
  return (
    <>
      <span data-testid="email-field">{ userEmail }</span>
      <span data-testid="total-field">{this.sumValues()}</span>
      <span data-testid="header-currency-field">BRL</span>
    </>
  );
}
}
const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
