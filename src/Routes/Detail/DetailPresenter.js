import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Loader from 'Components/Loader';
import DetailTabContainer from '../../Components/DetailTab';
import Collection from 'Components/Collection';

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 30px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const CoverImg = styled.img`
  height: 100%;
  border-radius: 5px;
  background-color: orange;
`;

const Data = styled.div`
  max-width: 450px;
  margin-left: 30px;
`;

const Title = styled.h3`font-size: 32px;`;

const ItemContainer = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Item = styled.span``;

const Divider = styled.span`margin: 0 10px;`;

const IMDB = styled.img`height: 15px;`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 100%;
`;

const CollectionTitle = styled.h3`
  font-size: 32px;
  margin-bottom: 20px;
`;

const DetailPresenter = ({ result, loading, error }) => {
  let isTabExist = false;
  if (result) {
    const { videos: { results }, production_companies, production_countries } = result;
    if (results && results.length > 0) {
      isTabExist = true;
    } else if (production_companies && production_companies.length > 0) {
      isTabExist = true;
    } else if (production_countries && production_countries.length > 0) {
      isTabExist = true;
    }
  }
  return loading ? (
    <React.Fragment>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </React.Fragment>
  ) : (
    <Container>
      <Helmet>
        <title>{result.original_title ? result.original_title : result.original_name} | Nomflix</title>
      </Helmet>
      <Backdrop bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`} />
      <Content>
        <CoverImg
          src={
            result.poster_path ? (
              `https://image.tmdb.org/t/p/original${result.poster_path}`
            ) : (
              require('../../assets/noPosterSmall.png')
            )
          }
        />
        <Data>
          <Title>{result.original_title ? result.original_title : result.original_name}</Title>
          <ItemContainer>
            <Item>
              {result.release_date ? (
                result.release_date.substring(0, 4)
              ) : result.first_air_date ? (
                result.first_air_date.substring(0, 4)
              ) : (
                'x'
              )}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time ? result.episode_run_time[0] : 'x'} min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map(
                  (genre, index) => (index === result.genres.length - 1 ? genre.name : `${genre.name} / `)
                )}
            </Item>
            {result.imdb_id &&
            result.imdb_id.length > 0 && (
              <React.Fragment>
                <Divider>•</Divider>
                <Item>
                  <a href={`https://www.imdb.com/title/${result.imdb_id}/`} target="_blank" rel="noopener noreferrer">
                    <IMDB src={require('assets/imdb.png')} />
                  </a>
                </Item>
              </React.Fragment>
            )}
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          {isTabExist && <DetailTabContainer data={result} />}
          {result.belongs_to_collection && (
            <React.Fragment>
              <Link to={`/collection/${result.belongs_to_collection.id}`}>
                <CollectionTitle>Collection</CollectionTitle>
              </Link>
              <Collection collectionId={result.belongs_to_collection.id} />
            </React.Fragment>
          )}
        </Data>
      </Content>
    </Container>
  );
};

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default DetailPresenter;
