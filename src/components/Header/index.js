import React, {useState} from "react";
import PropTypes from 'prop-types';
import { HeaderDisplay } from "./styles/HeaderDisplay";

function Header ({tradeInfo, setTradeInfo, socket}) {
  const [usernameOk, setUsernameOk] = useState(false);
  // const {user, partner} = tradeInfo;
  const sendUsername = () => {
    setTradeInfo({...tradeInfo, user: tradeInfo.user})
    setUsernameOk(true);
    socket.emit('user', {user: tradeInfo.user}, 'trade')
  }
  return (
    <HeaderDisplay>
      <span className="header-section">
        {!usernameOk ?   
          <div className="username-form">     
            <label>
            Username:
              <input
                placeholder="ex:red96"
                value={tradeInfo.user}
                type="text"
                name="user"
                onChange={({target}) => setTradeInfo({...tradeInfo, user: target.value})}
              />
            </label>
            <button className="add-btn" onClick={sendUsername}>
              Ok
            </button>
        </div>
        :
        <p className='user-status'>{`${tradeInfo.user} ON`}</p>
        }
      </span>
      <p className="logo">PokeTRADER</p>
      <span className="header-section">
        <p className='partner-status'>{tradeInfo.partner ? `${tradeInfo.partner} ON` : `...waiting`}</p>
      </span>
    </HeaderDisplay>
  );
}

Header.propTypes = {
  tradeInfo: PropTypes.object,
  setTradeInfo: PropTypes.func,
  socket: PropTypes.object
};

export default Header;