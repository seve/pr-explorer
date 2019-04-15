import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components/macro';

import Huddle from './Huddle';
import HuddleList from './HuddleList';
import User from './User';

import jsonData from '../data.json';

const ACCESS_TOKEN = '96ee9c9e301e2d7f79615bbb027228fc6b05c110';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${ACCESS_TOKEN}`,
  },
});

const StyledApp = styled.div`
  background-color: #0A1E2B;
  height: 100vh;
  margin: 0 0;
  padding: 8vw;
`;

const H1 = styled.h1`
  margin: auto;
  width: 30%;
  text-align: center;
  font-size: 4vw;
  color:#EAA823;
`;

class App extends Component {
  constructor(props) {
    super(props);

    const users = jsonData.huddles.map(huddle => huddle.huddle_members.map(user => user));

    this.state = {
      users,
    };
  }

  render() {
    const { ...state } = this.state;
    return (
      <Router>
        <ApolloProvider client={client}>
          <StyledApp>
            <H1>PR Explorer</H1>
            <Route exact path="/" component={HuddleList} />
            <Route exact path="/huddle/:index" render={props => <Huddle {...props} users={state.users} />} />
            <Route path="/huddle/:index/user/:nodeID" render={props => <User {...props} users={state.users} />} />
          </StyledApp>
        </ApolloProvider>
      </Router>
    );
  }
}

export default App;
