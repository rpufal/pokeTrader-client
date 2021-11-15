import React from "react";
import { ConfirmButtonsDisplay } from "./style/ConfirmButtonsDisplay";
import PropTypes from 'prop-types';


function ConfirmButtons ({readyTrade}) {
  // const [userReady, setUserReady] = useState(false);
  // const [partnerReady, setPartnerReady] = useState(false);
  // const isReady = (boolean) => {
  //   setUserReady(boolean);
  //   setPartnerReady(boolean);
  //   readyTrade(true);
  // }
  return (
    <ConfirmButtonsDisplay>
      {/* {!userReady 
      ? <button className="ready-btn" onClick={() => isReady(true)}>Ready</button> 
      : <button className="cancel-btn" onClick={() => isReady(false)}>Cancel</button>} */}
      <button 
        className={`trade-btn true}`} 
        // disabled={userReady && partnerReady}
        onClick={() => readyTrade(true)}>Trade</button>
      {/* {!partnerReady 
      ? <button className="ready-btn" onClick={() => isReady(true)}>Ready</button> 
      : <button className="cancel-btn" onClick={() => isReady(false)}>Cancel</button>} */}
    </ConfirmButtonsDisplay>
  );
}

ConfirmButtons.propTypes = {
  readyTrade: PropTypes.func,
  // tradeInfo: PropTypes.objectOf([])
};


export default ConfirmButtons;