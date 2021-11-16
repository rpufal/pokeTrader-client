import styled from 'styled-components';

export const HeaderDisplay = styled.header`
background-color: #FF6700;
color: #EBEBEB;
width: 100vw;
display:flex;
flex-direction: row;
justify-content: space-evenly;
align-items: center;
position: fixed;
top:0;
left: 0;

.header-section {
  width: 18rem;
}

.logo {
  width: 33%auto;
}

.username-form {
  display: flex;
  flex-direction: row;
  align-self: center;
  align-items: center;
}


.username-form label {
  color: #EBEBEB;
}

.username-form input {
  border: 0.5px solid #EBEBEB;
  background-color: #142338;
  color: #EBEBEB;
  border-radius: 0.1rem;
  padding: 0.2rem;
}

.add-btn {
  padding: 0.2rem;
  background-color: #FF6700;
  color: #EBEBEB;
  border: none;
  border-radius: 0.1rem;
}

.add-btn:hover {
  background-color: #f59c5f;
  color: #2B4162;
}
`;