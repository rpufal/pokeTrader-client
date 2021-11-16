import React from "react";
import { ConfirmButtonsDisplay } from "./style/ConfirmButtonsDisplay";
import PropTypes from 'prop-types';


function ConfirmButtons ({readyTrade}) {
  return (
    <ConfirmButtonsDisplay>
      <button 
        className={`trade-btn true}`} 
        onClick={() => readyTrade(true)}>Trade</button>
    </ConfirmButtonsDisplay>
  );
}

ConfirmButtons.propTypes = {
  readyTrade: PropTypes.func,
};


export default ConfirmButtons;