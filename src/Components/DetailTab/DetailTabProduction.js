import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 90px);
  grid-column-gap: 10px;
  grid-row-gap: 20px;
  padding: 10px;
  justify-content: center;
  padding: 10px;
  padding-bottom: 20px;
`;

const GridItem = styled.div`width: 100%;`;

const LogoPosterContainer = styled.div`
  width: 100%;
  height: 90px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
`;

const LogoPoster = styled.img`
  width: 100%;
  height: auto;
`;

const Desc = styled.p`
  margin-top: 10px;
  font-size: 14px;
  text-align: center;
  font-weight: 400;
`;

const DetailTabProduction = ({ productionList }) => (
  <Grid>
    {productionList.map(({ logo_path, name }) => (
      <GridItem key={name}>
        <LogoPosterContainer>
          <LogoPoster
            src={logo_path ? `https://image.tmdb.org/t/p/w200${logo_path}` : require('assets/noPosterSmall.png')}
          />
        </LogoPosterContainer>
        <Desc>{name}</Desc>
      </GridItem>
    ))}
  </Grid>
);

DetailTabProduction.propTypes = {
  productionList: PropTypes.array.isRequired
};

export default DetailTabProduction;
