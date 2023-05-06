import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../assets/logo.svg';
import user from '../assets/Vector.svg';
import expense from '../assets/Vector2.svg';

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
    <div className="hd-container">
      <div className="hd-infos">
        <div>
          <img src={ logo } alt="logo-trybewallet" />
        </div>
        <div className="hd-expenses">
          <img src={ expense } alt="icon-expense" />
          <span data-testid="total-field">
            <strong>Total de despesas:</strong>
            { ' ' }
            {this.sumValues()}
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
        <div className="hd-users">
          <img src={ user } alt="icon-user" />
          <span data-testid="email-field">{ userEmail }</span>
        </div>
      </div>
    </div>
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
