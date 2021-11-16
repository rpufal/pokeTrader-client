import React, {useRef,useCallback} from "react";
import PropTypes from 'prop-types';
import { HeaderDisplay } from "./styles/HeaderDisplay";

function Header ({user, setUser,partner }) {
  const inputRef = useRef()
  const handlerSendUserName = useCallback(() => {
    setUser(inputRef.current.value);
  },[])
  return (
    <HeaderDisplay>
      <span className="header-section">
        {!user ? 
          <div className="username-form">     
            <label >
            Username:
              <input
                placeholder="ex:red96"
                type="text"
                name="user"
                ref={inputRef}
              />
            </label>
            <button className="add-btn" onClick={handlerSendUserName}>
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