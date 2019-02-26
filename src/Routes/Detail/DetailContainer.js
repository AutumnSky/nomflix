import React from 'react';
import DetailPresenter from './DetailPresenter';
import * as api from 'api';

export default class extends React.Component {
  constructor(props) {
    super(props);
    const { location: { pathname } } = props;

    this.state = {
      result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes('/movie/')
    };
  }

  componentDidMount() {
    this.refreshView();
  }

  // CollectionPresenter의 handleClick메소드에서 history.push로 새로운 movie id를 넣어준다
  // history.push("/movie/122")
  // 그 후에 이 컴포넌트에서 props가 바뀌어서 UI가 갱신됨
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.refreshView();
    }
  }

  refreshView = async () => {
    const { match: { params: { id } }, history: { push } } = this.props;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push('/');
    }
    const { isMovie } = this.state;
    let result = null;
    try {
      if (isMovie) {
        ({ data: result } = await api.movie.movieDetail(parsedId));
      } else {
        ({ data: result } = await api.tv.showDetail(parsedId));
      }
    } catch (error) {
      this.setState({ error: "Can't find anything." });
    } finally {
      this.setState({ loading: false, result });
    }
  };

  render() {
    const { result, error, loading } = this.state;
    return <DetailPresenter result={result} error={error} loading={loading} />;
  }
}
