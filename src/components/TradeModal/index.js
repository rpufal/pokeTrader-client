import React, {useEffect} from "react"
import PropTypes from 'prop-types';
import { TradeModalDisplay } from "./styles/TradeModalDisplay"
import { postTrade } from '../../services/tradeApi';

function TradeModal({closeModal, user, partner, pokemonList, partnerPokemonList, socket}) {
  const getTotalExp = (array) => {
    const total = array.reduce((acc,cur) => {
      acc = acc + cur.base_experience
      return acc;
    }, 0)
    return total;
  }
  const userTotal = getTotalExp(pokemonList);
  const partnerTotal = getTotalExp(partnerPokemonList);
  const isValid = () => {
    if (userTotal === 0|| partnerTotal === 0 ) return false;
    const tradeIndex = 0.09
    const validRatio = (userTotal + partnerTotal) * tradeIndex;
    if ( Math.abs(userTotal - partnerTotal) <= validRatio) {
      return true;
    }
    return false;
  }

  useEffect(async () => {
    const response = {
      user, 
      partner, 
      userPokemonList: pokemonList.map(({name, base_experience}) =>({name, base_experience})), 
      partnerPokemonList: partnerPokemonList.map(({name, base_experience}) => ({name, base_experience})),
      isValid: isValid()
    }
    const postResponse = await postTrade(response)
    if (postResponse.error) alert(postResponse.error);
  },[])

  const close = () => {
    socket.emit('readyTrade',{ready: false}, 'trade')
    closeModal()
  }

  return (
    <TradeModalDisplay>
      <div className="up">
        <h2>Trade Log</h2>
        <a onClick={close} ><h1 className="close">+</h1></a>
      </div>
      <div className="middle">
        <div className="user-receipt">
            <h4>{user}</h4>
            <p className="total">{`Total base experience: ${getTotalExp(pokemonList)} exp`}</p>
            {pokemonList.map(({name, base_experience}) => 
            (<p key={base_experience + name}>{`${name}: ${base_experience} exp`}</p>))}
        </div>
        <div className="partner-receipt">
            <h4>{partner}</h4>
            <p className="total">{`Total base experience: ${getTotalExp(partnerPokemonList)} exp`}</p>
            {partnerPokemonList.map(({name, base_experience}) => 
            (<p key={base_experience + name}>{`${name}: ${base_experience} exp`}</p>))}
        </div>
      </div>
      <div className="low">
        <p className="validity">{isValid() ? 'VALID TRADE' : 'INVALID TRADE'}</p>
      </div>
    </TradeModalDisplay>
  )
}

TradeModal.propTypes = {
  closeModal: PropTypes.func,
  pokemonList: PropTypes.array,
  partnerPokemonList: PropTypes.array,
  user: PropTypes.string,
  partner: PropTypes.string,
  socket: PropTypes.object
};

export default TradeModal;