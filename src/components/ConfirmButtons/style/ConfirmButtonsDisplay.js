import styled from 'styled-components';

export const ConfirmButtonsDisplay = styled.div`
display:flex;
flex-direction: row;
justify-content: space-evenly;
align-items: center;
width: 100vw;
margin-top: 1rem;
margin-bottom: 1rem;

.trade-btn {
  padding: 1rem;
  background-color: #FF6700;
  padding-left: 2rem;
  padding-right: 2rem;
  color: #EBEBEB;
  border: none;
  border-radius: 0.1rem;
}

.trade-btn:hover {
  background-color: #3BC14A;
  color: #2B4162;
}

.true {
  background-color: #3BC14A;
}
`;