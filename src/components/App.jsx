import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Huddle from './Huddle';
import logo from '../logo.svg';
import '../App.css';
import jsonData from '../data.json';

const ACCESS_TOKEN = '96ee9c9e301e2d7f79615bbb027228fc6b05c110';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${ACCESS_TOKEN}`,
  },
});

class App extends Component {
  constructor(props) {
    super(props);

    const huddles = jsonData.huddles.map(huddle => huddle.huddle_lead);

    this.state = {
      huddles,
    };
  }

  render() {
    const { ...state } = this.state;
    return (
      <Router>
        <ApolloProvider client={client}>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              {state.huddles.map((huddleLeader, index) => (
                <Link key={huddleLeader} to={`/huddle/${index}`}>
                  {`Team: ${huddleLeader}`}
                </Link>
              ))}
              <Route path="/huddle/:index" component={Huddle} />
            </header>
          </div>
        </ApolloProvider>
      </Router>
    );
  }
}

export default App;
