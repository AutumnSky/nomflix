import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import Loader from 'Components/Loader';
import Message from 'Components/Message';

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  margin-bottom: 30px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-row-gap: 20px;
`;
const GridItem = styled.div`
  width: 100%;
  background-color: black;
  border-radius: 5px;
  height: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ItemBackdrop = styled.div`
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
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
  z-index: 10;
  position: relative;
`;

const ItemPoster = styled.img`
  width: 50%;
  position: relative;
`;

const ItemOverview = styled.p`
  padding: 20px;
  font-size: 15px;
  position: relative;
  line-height: 1.5;
`;

const CollectionPresenter = ({ loading, error, collectionList }) =>
  loading ? (
    <Loader />
  ) : (
    <React.Fragment>
      {error && <Message color="#e74c3c" text={error} />}
      <Container>
        <Grid>
          {collectionList &&
            collectionList.map((part) => (
              <a href={`/movie/${part.id}`} key={part.id}>
                <GridItem>
                  <ItemBackdrop bgImage={`https://image.tmdb.org/t/p/original${part.backdrop_path}`} />
                  <ItemTitle>{part.original_title}</ItemTitle>
                  <ItemPoster
                    src={
                      part.poster_path ? (
                        `https://image.tmdb.org/t/p/original${part.poster_path}`
                      ) : (
                        require('assets/noPosterSmall.png')
                      )
                    }
                  />
                  <ItemOverview>{part.overview}</ItemOverview>
                </GridItem>
              </a>
            ))}
        </Grid>
      </Container>
    </React.Fragment>
  );

CollectionPresenter.propTypes = {
  loading: propTypes.bool.isRequired,
  error: propTypes.bool,
  collectionList: propTypes.array
};

export default CollectionPresenter;
