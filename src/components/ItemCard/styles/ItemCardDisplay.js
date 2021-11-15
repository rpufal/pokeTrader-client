import styled from 'styled-components';

export const ItemCardDisplay = styled.div`
/* #fire {
  background-color: red;
}; */
* {
  margin: 0.15rem;
}

width: 8rem;
padding-left: 0.8rem;
padding-right: 0.8rem;
margin-bottom: 0.8rem;
border:solid yellow;
border-radius: 0.5rem;
display: flex;
flex-direction: column;
justify-content: center;
background-color: #B9CFD4;


.header{
  display:flex;
  /* align-self: flex-start; */
  justify-content: space-between;
  align-items: baseline;
  flex-direction: row;
  font-weight: bold;
  font-size: 0.8rem;
}
.header .name {
  margin-left: 0.1rem;
}

.header .name::first-letter {
  text-transform:capitalize
}

.close {
  padding: 0;
  background: none;
  border: none;
  font-weight: bold;
}

.close:hover {
  color: red;
}

.info {
  font-size: 0.6rem;
  display: flex;
  flex-direction: row;
  /* align-self: center; */
  justify-content: space-evenly;
}
.exp {
  font-size: 0.7rem;
  font-weight: bold;
}
img {
  width: 5rem;
  align-self: center;
  background-color: #CEE0DC;
  padding-left: 1rem;
  padding-right: 1rem;
  border: solid yellow;
  border-radius: 0.5rem;
}

`