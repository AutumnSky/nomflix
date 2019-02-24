import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 50px;
  padding: 10px;
  position: relative;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  font-size: 15px;
  width: 100px;
  &:focus {
    outline: 0;
  }
`;

const FocusLine = styled.div`
  width: 100px;
  background-color: #3498db;
  height: 3px;
  position: absolute;
  top: 45px;
  left: ${(props) => `${props.left}px`};
  transition: left 0.3s ease-in-out;
`;

export default ({ isYoutube, isProduction, isCountry, selectedButtonIndex, handleClick }) => {
  let focusLineLeft = 10;
  if (selectedButtonIndex === 0) {
    focusLineLeft = 10;
  } else if (selectedButtonIndex === 1) {
    focusLineLeft = 110;
  } else {
    focusLineLeft = 210;
  }
  return (
  <Container>
    {/* button */}
    {isYoutube && <Button onClick={(e) => handleClick(0)}>Youtube</Button>}
    {isProduction && <Button onClick={(e) => handleClick(1)}>Production</Button>}
    {isCountry && <Button onClick={(e) => handleClick(2)}>Country</Button>}
    {/* focus line */}
    {

    }
    <FocusLine left={focusLineLeft} />
  </Container>);
}
