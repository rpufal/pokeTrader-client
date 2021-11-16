import React, {useState} from "react";
import PropTypes from 'prop-types';
import { HeaderDisplay } from "./styles/HeaderDisplay";

function Header ({user, partner, setUser, socket}) {
  const [usernameOk, setUsernameOk] = useState(false);
  const handleChange = ({target}) => {
    setUser(target.value)
  }
  const sendUsername =() => {
    setUsernameOk(true);
    socket.emit('user', {user: user}, 'trade')
  }
  return (
    <HeaderDisplay>
      <span className="header-section">
        {!usernameOk?   
          <div className="username-form">     
            <label >
            Username:
              <input
                placeholder="ex:red96"
                value={user}
                type="text"
                name="user"
                onChange={handleChange}
              />
            </label>
            <button className="add-btn" onClick={sendUsername}>
              Ok
            </button>
        </div>
        :
        <p className='user-status'>{`${user} ON`}</p>
        }
      </span>
      <p className="logo">PokeTRADER</p>
      <span className="header-section">
        <p className='partner-status'>{partner ? `${partner} ON` : `...waiting`}</p>
      </span>
    </HeaderDisplay>
  );
}

Header.propTypes = {
  user: PropTypes.string,
  setUser: PropTypes.func,
  partner: PropTypes.string,
  socket: PropTypes.object
};

export default Header;