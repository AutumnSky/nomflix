import React from 'react';
import propTypes from 'prop-types';
import CollectionPresenter from './CollectionPresenter';
import * as api from 'api';

class CollectionContainer extends React.Component {
  state = {
    collectionList: null,
    loading: true
  };
  async componentDidMount() {
    const { collectionId } = this.props;
    try {
      const { data: { parts: collectionList } } = await api.collection.getDetail(collectionId);
      this.setState({ collectionList });
    } catch (error) {
      this.setState({
        error: "Can't find collection",
        loading: false
      });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading, error, collectionList } = this.state;
    return <CollectionPresenter loading={loading} error={error} collectionList={collectionList} />;
  }
}

CollectionContainer.propTypes = {
  collectionId: propTypes.number.isRequired
};

export default CollectionContainer;
