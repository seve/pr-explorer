import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { ApolloProvider, Query } from 'react-apollo';


import logo from '../logo.svg';
import '../App.css';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stupid: '',
    };
  }

  render() {
    const { ...state } = this.state;
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Query
              query={gql`
                {
                  nodes(ids:["MDQ6VXNlcjg3MTY4Mjk="]){
                    ... on User {
                      email,
                      login,
                      id
                    }
                  }
                }
  `}
            >
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;

                return data.nodes.map(({ email, login, id }) => (
                  <div key={id}>
                    <p>
                      {id}
:
                      {' '}
                      {email}
,
                      {' '}
                      {login}
                    </p>
                  </div>
                ));
              }}
            </Query>
          </header>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
