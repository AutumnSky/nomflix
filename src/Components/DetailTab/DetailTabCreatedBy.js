import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const Item = styled.div`
  width: 100px;
  height: auto;
  &:not(:last-child) {
    margin-right: 18px;
  }
`;

const ItemPoster = styled.img`
  width: 100%;
  background-color: white;
  border-radius: 5px;
`;

const ItemName = styled.p`
  display: inline-block;
  width: 100%;
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
  font-weight: 500;
`;

const DetailTabCreatedBy = ({ createdByList }) => (
  <Container>
    {createdByList.map((createdBy) => {
      return (
        <Item key={createdBy.id}>
          <ItemPoster
            src={
              createdBy.profile_path ? (
                `https://image.tmdb.org/t/p/w200${createdBy.profile_path}`
              ) : (
                require('assets/noPosterSmall.png')
              )
            }
          />
          <ItemName>{createdBy.name}</ItemName>
        </Item>
      );
    })}
  </Container>
);

DetailTabCreatedBy.propTypes = {
  createdByList: propTypes.array.isRequired
};

export default DetailTabCreatedBy;
