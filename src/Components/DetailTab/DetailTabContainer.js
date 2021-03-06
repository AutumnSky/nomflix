import React from 'react';
import DetailTabHeader from './DetailTablHeader';
import DetailTabYoutube from './DetailTabYoutube';
import DetailTabProduction from './DetailTabProduction';
import DetailTabCountry from './DetailTabCountry';
import DetailTabCreatedBy from './DetailTabCreatedBy';
import styled from 'styled-components';

const Container = styled.div`
  margin: 30px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: black;
  border-radius: 10px;
`;

class DetailTablContainer extends React.Component {
  state = {
    selectedButton: null
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { data: { videos: { results }, production_companies, production_countries, created_by } } = this.props;
    let selectedButton = null;
    if (results && results.length > 0) {
      selectedButton = 'youtube';
    } else if (production_companies && production_companies.length > 0) {
      selectedButton = 'production';
    } else if (production_countries && production_countries.length > 0) {
      selectedButton = 'country';
    } else if (created_by && created_by.length > 0) {
      selectedButton = 'createdby';
    }

    this.setState({
      selectedButton
    });
  }

  handleClick(selectedButton) {
    this.setState({
      selectedButton
    });
  }

  render() {
    const { selectedButton } = this.state;
    const { data: { videos: { results }, production_companies, production_countries, created_by } } = this.props;
    const isYoutube = results && results.length > 0;
    const isProduction = production_companies && production_companies.length > 0;
    const isCountry = production_countries && production_countries.length > 0;
    const isCreatedBy = created_by && created_by.length > 0;
    return (
      <Container>
        <DetailTabHeader
          isYoutube={isYoutube}
          isProduction={isProduction}
          isCountry={isCountry}
          isCreatedBy={isCreatedBy}
          selectedButton={selectedButton}
          handleClick={this.handleClick}
        />
        {/* Youtube */}
        {selectedButton === 'youtube' && results.length > 0 && <DetailTabYoutube playerKey={results[0].key} />}
        {/* Companies */}
        {selectedButton === 'production' && <DetailTabProduction productionList={production_companies} />}
        {/* Countries */}
        {selectedButton === 'country' && <DetailTabCountry countryList={production_countries} />}
        {/* CreatedBy */}
        {selectedButton === 'createdby' && <DetailTabCreatedBy createdByList={created_by} />}
      </Container>
    );
  }
}

export default DetailTablContainer;
