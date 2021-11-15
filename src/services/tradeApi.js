
export const postTrade = async (tradeInfo) => {
  const url = `http://localhost:3001/trade/`;
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
