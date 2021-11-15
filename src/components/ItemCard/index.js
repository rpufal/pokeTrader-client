import React from 'react';
import PropTypes from 'prop-types';
import { ItemCardDisplay } from './styles/ItemCardDisplay';

function ItemCard({info, removePokemon}) {
  return (
    <ItemCardDisplay id={info.types[0].type.name}>
        <div className='header'>
          <p>{`# ${info.id}`}</p>
          <p className='name'>{info.name}</p>
          <button onClick={() => removePokemon(info)} className='close'>x</button>
        </div>
        <img src={info.sprites.other['official-artwork'].front_default} alt={info.name}/>
        <p className="exp">{`Base experience: ${info.base_experience}`}</p>
        <div className='info'>
          <div>
            <p>{`HP: ${info.stats[0].base_stat}`}</p>
            <p>{`ATK: ${info.stats[1].base_stat}`}</p>
            <p>{`DEF: ${info.stats[2].base_stat}`}</p>
          </div>
          <div>
            <p>{`SP.ATK: ${info.stats[3].base_stat}`}</p>
            <p>{`SP.DEF: ${info.stats[4].base_stat}`}</p>
            <p>{`SPEED: ${info.stats[5].base_stat}`}</p>
          </div>
        </div>
    </ItemCardDisplay>
  );
}

ItemCard.propTypes = {
  info: PropTypes.object,
  removePokemon: PropTypes.func
};
export default ItemCard;