import styled from 'styled-components';

export const SearchBarDisplay = styled.div`
display: flex;
flex-direction: row;
justify-content: space-evenly;
align-items: center;
width: 25rem;

.searchbar {
  color: #EBEBEB;
}

.searchbar input {
  margin-left: 0.3rem;
  margin-right: 0.2rem;
  border: 0.5px solid #EBEBEB;
  background-color: #142338;
  color: #EBEBEB;
  border-radius: 0.1rem;
  padding: 0.2rem;
}

.add-btn {
  padding: 0.2rem;
  background-color: #FF6700;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  color: #EBEBEB;
  border: none;
  border-radius: 0.1rem;
}

.add-btn:hover {
  background-color: #f59c5f;
  color: #2B4162;
}
`;