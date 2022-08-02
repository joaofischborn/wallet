const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const getCoinsFromAPI = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SELECTED_COIN':
    return {
      ...state,
      currencies: action.currencies,
    };
  case 'GET_EXPENSES':
    return {
      ...state,
      expenses: [...state.expenses, { ...action.expenses }],
    };
  case 'REMOVE_STATE':
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense !== action.remove),
    };
  default:
    return state;
  }
};

export default getCoinsFromAPI;
