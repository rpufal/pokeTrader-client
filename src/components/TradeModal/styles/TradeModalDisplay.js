import styled from 'styled-components';

export const TradeModalDisplay = styled.div`
width: 50vw;
min-width: 35vw;
background-color: #2B4162;
color: #EBEBEB;
padding-bottom: 1.5%;
margin-bottom: 2rem;

.up {

  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #FF6700;
}

.close {
  transform: rotate(45deg);
}

.close:hover {
  transform: rotate(90deg);
}

.middle {
  margin-left: 5%;
  margin-bottom: 2%;
  margin-right: 5%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items:center;
}

.total {
  font-weight: bold;
}

.low {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: bold
}
`;