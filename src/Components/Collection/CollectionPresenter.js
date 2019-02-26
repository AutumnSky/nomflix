import React from 'react';
import { withRouter } from 'react-router-dom';
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

  &:hover {
    cursor: pointer;
  }
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
  background-color: ${({ isBlank }) => (isBlank ? 'rgba(255, 255, 255, 0.3)' : 'transparent')};
  border-radius: 5px;
  margin-top: 10px;
`;

const ItemOverview = styled.p`
  padding: 20px;
  font-size: 15px;
  position: relative;
  line-height: 1.5;
`;

const CollectionPresenter = ({ loading, error, collectionList, history, match }) => {
  // movie 항목 교체
  const handleClick = (movieId) => {
    if (match.params.id !== movieId.toString()) {
      history.push(`/movie/${movieId}`);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <React.Fragment>
      {error && <Message color="#e74c3c" text={error} />}
      <Container>
        <Grid>
          {collectionList &&
            collectionList.map((part) => (
              <GridItem key={part.id} onClick={(event) => handleClick(part.id)}>
                <ItemBackdrop
                  bgImage={part.backdrop_path ? `https://image.tmdb.org/t/p/original${part.backdrop_path}` : ''}
                />
                <ItemTitle>{part.original_title}</ItemTitle>
                <ItemPoster
                  src={
                    part.poster_path ? (
                      `https://image.tmdb.org/t/p/original${part.poster_path}`
                    ) : (
                      require('assets/noPosterSmall.png')
                    )
                  }
                  isBlank={part.poster_path ? false : true}
                />
                <ItemOverview>{part.overview}</ItemOverview>
              </GridItem>
            ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

CollectionPresenter.propTypes = {
  loading: propTypes.bool.isRequired,
  error: propTypes.bool,
  collectionList: propTypes.array
};

export default withRouter((props) => <CollectionPresenter {...props} />);
