import styled from 'styled-components';

export const MainPageDisplay = styled.main`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: #2B4162;
height: 100vh;

.trade-station {
  margin-top: 10vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.user {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50vw;
}
.partner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50vw;
}
.card-list {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: space-between;
  flex-wrap: wrap;
  width: 34rem;
  margin-top: 2rem;
}

.partner-status-message {
  color: #EBEBEB;
  margin: 0px;
}

//modal
.modal-background  {
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,.5);
    position: fixed;
    display: none;
    top: 0px;
    z-index: 2000;
    justify-content: center;
    align-items: center;
  }

  @keyframes modal {
    from {
      opacity: 0;
      transform: translate3d(0, -60px, 0)
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0)
    }
  }

  .modal-background.true {
    display: flex;
    flex-direction: column;
    animation: modal .3s;
  }

  .modal-background.true .modal {
    animation: modal .3s;
  }
`;