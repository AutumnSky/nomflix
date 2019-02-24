import React from 'react';
import DetailTabHeader from './DetailTablHeader';
import DetailTabYoutube from './DetailTabYoutube';
import DetailTabProduction from './DetailTabProduction';
import DetailTabCountry from './DetailTabCountry';
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
    selectedButtonIndex: 0
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { data: { videos: { results }, production_companies, production_countries } } = this.props;
    let initButtonIndex = 0;
    if (results && results.length > 0) {
      initButtonIndex = 0;
    } else if (production_companies && production_companies.length > 0) {
      initButtonIndex = 1;
    } else if (production_countries && production_countries.length > 0) {
      initButtonIndex = 2;
    }
    this.setState({
      selectedButtonIndex: initButtonIndex
    });
  }

  handleClick(buttonIndex) {
    this.setState({
      selectedButtonIndex: buttonIndex
    });
  }

  render() {
    const { selectedButtonIndex } = this.state;
    const { data: { videos: { results }, production_companies, production_countries } } = this.props;
    return (
      <Container>
        <DetailTabHeader
          isYoutube={results && results.length > 0}
          isProduction={production_companies && production_companies.length > 0}
          isCountry={production_countries && production_countries.length > 0}
          selectedButtonIndex={selectedButtonIndex}
          handleClick={this.handleClick}
        />
        {/* Youtube */}
        {selectedButtonIndex === 0 && results && results.length > 0 && <DetailTabYoutube playerKey={results[0].key} />}
        {/* Companies */}
        {selectedButtonIndex === 1 &&
        production_companies &&
        production_companies.length > 0 && <DetailTabProduction productionList={production_companies} />}
        {/* Countries */}
        {selectedButtonIndex === 2 &&
        production_countries &&
        production_countries.length > 0 && <DetailTabCountry countryList={production_countries} />}
      </Container>
    );
  }
}

export default DetailTablContainer;
