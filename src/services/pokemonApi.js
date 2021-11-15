export const fetchPokemonByName = async (name) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  try {
  const result = await fetch(url).then((response) => response.json());
  return result
  } catch (error) {
    return {error: error}
  }
};
