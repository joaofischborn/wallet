const getEconomyCoins = async () => {
  const ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';
  try {
    const data = await fetch(ENDPOINT);
    const response = await data.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};
export default getEconomyCoins;
