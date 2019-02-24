import React from 'react';
import HomePresenter from './HomePresenter';
import * as api from "api";
export default class extends React.Component {
  state = {
    nowPlaying: null,
    upcoming: null,
    popular: null,
    error: null,
    loading: true
  };

  async componentDidMount() {
    try {
      const {
        data: { results: nowPlaying }
      } = await api.movie.nowPlaying();
      const {
        data: { results: upcoming }
      } = await api.movie.upcoming();
      const {
        data: { results: popular }
      } = await api.movie.popular();
      this.setState({
        nowPlaying,
        upcoming,
        popular
      });
    } catch {
      this.setState({
        error: "Can't find movies information."
      });
    } finally {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    const { nowPlaying, upcoming, popular, error, loading } = this.state;
    return (
      <HomePresenter nowPlaying={nowPlaying} upcoming={upcoming} popular={popular} error={error} loading={loading} />
    );
  }
}
