import React, { useState, useRef, useCallback } from "react";
import PropTypes from 'prop-types';
import { fetchPokemonByName } from '../../services/pokemonApi';
import { SearchBarDisplay } from "./styles/SearchBarDisplay";


function SearchBar ({onSubmit,pokemonList}) {
  const [pokemon,setPokemon] = useState()
  const inputRef = useRef()
  
  const handlerSubmit = useCallback(()=>{
    onSubmit(pokemon)
  },[onSubmit,pokemon])
  const searchPokemon = async () => {
    if(pokemonList?.length + 1 > 6)  return alert("Você ja tem muitos pokemon em sua lista");
    const result = await fetchPokemonByName(inputRef.current.value.toLowerCase())

    if (result.error) return alert('Invalid request to PokemonAPI, please make a proper request with a pokemon name. e.g. sandshrew')
    alert(`Pokemon Encontrado ${result.name}`)
    return setPokemon(result)
  };
  
  
  return (
    <SearchBarDisplay>
      <label className='searchbar'>
        Add a Pokemon to the Trade:
        <input
          placeholder="ex:Charizard"
          type="text"
          name="name"
          ref={inputRef}
        />
      </label>
      <button className="add-btn" onClick={searchPokemon}>
        Buscar
      </button>
      <button className="add-btn" onClick={handlerSubmit}>
        Salvar
      </button>
    </SearchBarDisplay>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
  pokemonList: PropTypes.array
};

export default SearchBar;