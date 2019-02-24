import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from './Components/Header';
import Home from 'Routes/Home';
import TV from 'Routes/TV';
import Search from 'Routes/Search';
import Detail from 'Routes/Detail';
import Collection from 'Components/Collection';
import styled from 'styled-components';

const CollectionStyle = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px;
`;

export default () => (
  <BrowserRouter>
    <Fragment>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/tv" component={TV} />
        <Route path="/search" component={Search} />
        <Route path="/movie/:id" component={Detail} />
        <Route path="/show/:id" component={Detail} />
        {/* <Route path="/collection/:id" component={Collection} /> */}
        <Route
          path="/collection/:id"
          render={(props) => {
            console.log(props.match.params.id);
            return (
              <CollectionStyle>
                <Collection collectionId={parseInt(props.match.params.id)} />
              </CollectionStyle>
            );
          }}
        />
        <Redirect from="*" to="/" />
      </Switch>
    </Fragment>
  </BrowserRouter>
);
