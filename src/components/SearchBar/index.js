import React, { useState } from "react";
import PropTypes from 'prop-types';
import { SearchBarDisplay } from "./styles/SearchBarDisplay";


function SearchBar ({searchPokemon}) {
  const [filter, setFilter] = useState({name:''});
  return (
    <SearchBarDisplay>
      <label>
        Add a Pokemon to the Trade:
        <input
          placeholder="ex:Charizard"
          value={filter.name}
          type="text"
          name="name"
          onChange={({target}) => setFilter({...filter, name: target.value})}
        />
      </label>
      <button className="add-btn" onClick={() => searchPokemon(filter.name)}>
        OK
      </button>
    </SearchBarDisplay>
  );
}

SearchBar.propTypes = {
  searchPokemon: PropTypes.func
};

export default SearchBar;