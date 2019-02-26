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

    this.refreshView = this.refreshView.bind(this);
  }

  // 0
  componentDidMount() {
    console.log(0, 'componentDidMount');
    this.refreshView();
  }

  // CollectionPresenter의 handleClick메소드에서 history.push로 새로운 movie id를 넣어준다
  // history.push("/movie/122")
  // 그 후에 이 컴포넌트에서 props가 바뀌어서 componentWillReceiveProps가 실행됨

  // 1
  componentWillReceiveProps(nextProps) {
    // 컴포넌트가 prop 을 새로 받았을 때 실행됩니다.
    // prop 에 따라 state 를 업데이트 해야 할 때 사용하면 유용합니다.
    // 이 안에서 this.setState() 를 해도 추가적으로 렌더링하지 않습니다.
    // ref: https://velopert.com/1130
    console.log(1, 'DetailContainer - componentWillReceiveProps');
  }

  // 2
  shouldComponentUpdate(nextProps, nextState) {
    console.log(2, 'DetailContainer - shouldComponentUpdate');
    console.log(this.props.match.params.id);
    console.log(nextProps.match.params.id);

    // 이 분기문을 넣지 않으면 브라우저를 refresh했을 때 아래 return문의 조건이 false가 되어 refresh가 안됨
    if (!this.state.result) {
      return true;
    }

    // movie/121 -> movie/122 로 params.id가 변경되면 reder를 다시 함
    return this.props.match.params.id !== nextProps.match.params.id;
  }

  // 3
  componentWillUpdate(nextProps, nextState) {
    // 컴포넌트가 업데이트 되기 전에 실행됩니다.
    // 이 메소드 안에서는 this.setState() 를 사용하지 마세요 – 무한루프에 빠져들게 됩니다.
    // ref: https://velopert.com/1130
    console.log(3, 'DetailContainer - componentWillUpdate');
    // ISSUE: 클릭시 갱신되지 않고 다음 클릭에 갱신된다.
    // 이 위치인가?
    // this.refreshView();
  }

  // 4
  componentDidUpdate(prevProps, prevState) {
    console.log(4, 'DetailContainer - componentDidUpdate');
    // ISSUE: 클릭시 갱신되지 않고 다음 클릭에 갱신된다.
    // 이 위치인가?
    // this.refreshView();
  }

  async refreshView() {
    const { match: { params: { id } }, history: { push } } = this.props;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push('/');
    }

    console.log('refreshView', parsedId);

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
  }

  render() {
    const { result, error, loading } = this.state;
    console.log('render', result);
    return <DetailPresenter result={result} error={error} loading={loading} />;
  }
}
