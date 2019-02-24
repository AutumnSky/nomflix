import React, { Component, Fragment } from 'react';
import Router from './Router';
import GlobalStyles from './Components/GlobalStyles';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Router />
        <GlobalStyles />
      </Fragment>
    );
  }
}

export default App;
