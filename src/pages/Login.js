import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userEmail as userEmailInput } from '../redux/actions';
import logo from '../assets/logo.svg';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      button: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
    const { email, password } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const FIVE = 5;
    if (regex.test(email) && password.length >= FIVE) {
      this.setState({ button: false });
    } else {
      this.setState({ button: true });
    }
  }

  handleClick = () => {
    const { email } = this.state;
    const { dispatchUserEmail, history } = this.props;
    dispatchUserEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, button } = this.state;
    return (
      <div className="container">
        <div className="form-login">
          <img src={ logo } alt="logo-trybewallet" />
          <input
            data-testid="email-input"
            placeholder="Digite seu e-mail"
            type="email"
            id="user-email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <input
            data-testid="password-input"
            placeholder="Digite sua senha"
            type="password"
            id="user-password"
            name="password"
            value={ password }
            onChange={ this.handleChange }
          />

          <button
            type="button"
            disabled={ button }
            onClick={ this.handleClick }
          >
            Entrar

          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchUserEmail: (email) => dispatch(userEmailInput(email)),
});

Login.propTypes = {
  dispatchUserEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
