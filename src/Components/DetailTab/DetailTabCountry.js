import React from 'react';
import styled from 'styled-components';

const UL = styled.ul`
  padding: 20px 40px;
  list-style-type: circle;
`;

const LI = styled.li`
  font-size: 14px;
  font-weight: 400;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export default ({ countryList }) => <UL>{countryList.map((country) => <LI key={country.name}>{country.name}</LI>)}</UL>;
