const INITIAL_STATE = {
  currencies: [],
};

const getCoinsFromAPI = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SELECTED_COIN':
    return {
      ...state,
      currencies: action.currencies,
    };
  default:
    return state;
  }
};

export default getCoinsFromAPI;
