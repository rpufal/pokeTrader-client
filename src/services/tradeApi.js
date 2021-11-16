
export const postTrade = async (tradeInfo) => {
  // eslint-disable-next-line no-undef
  const url = `${process.env.REACT_APP_API_URL}trade/`;
  try {
    const result = await fetch(url, {
      method: 'POST', 
      body: JSON.stringify({...tradeInfo}),
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }}).then((response) => response.json());
    return result;
  } catch (error) {
    return {error: 'Invalid request for trade'}
  }
};
