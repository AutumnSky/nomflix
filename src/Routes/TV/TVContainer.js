import React from 'react';
import TVPresenter from './TVPresenter';
import * as api from "api";

export default class extends React.Component {
  state = {
    topRated: null,
    popular: null,
    airingToday: null,
    loading: true,
    error: null
  };

  async componentDidMount() {
    try {
      const {
        data: { results: topRated }
      } = await api.tv.topRated();
      const {
        data: { results: popular }
      } = await api.tv.popular();
      const {
        data: { results: airingToday }
      } = await api.tv.airingToday();
      this.setState({ topRated, popular, airingToday });
    } catch {
      this.setState({
        error: "Can't find TV information."
      });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { topRated, popular, airingToday, loading, error } = this.state;
    return (
      <TVPresenter topRated={topRated} popular={popular} airingToday={airingToday} loading={loading} error={error} />
    );
  }
}
