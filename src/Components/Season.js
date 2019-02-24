import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`margin-bottom: 30px;`;

const Title = styled.h3`
  font-size: 32px;
  margin-top: 10px;
  margin-bottom: 30px;
`;

const Item = styled.div`
  background-color: black;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
  border-radius: 5px;
`;

const ItemTitle = styled.span`
  display: block;
  width: 100%;
  background-color: #34495e;
  font-size: 15px;
  font-weight: 500;
  padding: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const ItemContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
  align-items: flex-start;
  padding: 14px;
`;

const ItemPoster = styled.img`
  width: 100px;
  height: auto;
  margin-right: 20px;
  background-color: white;
  border-radius: 5px;
`;

const ItemOverview = styled.p`
  font-size: 15px;
  line-height: 1.6;
`;

const Season = ({ seasonList }) => (
  <Container>
    <Title>Season</Title>
    {seasonList.map((seasonData) => {
      return (
        <Item key={seasonData.id}>
          <ItemTitle>{seasonData.name}</ItemTitle>
          <ItemContentContainer>
            <ItemPoster
              src={
                seasonData.poster_path ? (
                  `https://image.tmdb.org/t/p/original${seasonData.poster_path}`
                ) : (
                  require('assets/noPosterSmall.png')
                )
              }
            />
            <ItemOverview>{seasonData.overview}</ItemOverview>
          </ItemContentContainer>
        </Item>
      );
    })}
  </Container>
);

Season.propTypes = {
  seasonList: propTypes.array.isRequired
};

export default Season;
