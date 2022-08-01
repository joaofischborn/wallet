import getEconomyCoins from '../../services/economyAPI';

export const userEmail = (email) => ({
  type: 'USER_EMAIL',
  email,
});

export const selectCoins = (currencies) => ({
  type: 'SELECTED_COIN',
  currencies,
});
export const selectCoinsError = (error) => ({
  type: 'SELECT_ERROR',
  error,
});
export const valueFromInput = (expenses) => ({
  type: 'GET_EXPENSES',
  expenses,
});

export const getCoinsApiThunk = () => async (dispatch) => {
  try {
    const response = await getEconomyCoins();
    dispatch(selectCoins(response));
  } catch (error) {
    dispatch(selectCoinsError(error));
  }
};
