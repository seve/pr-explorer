import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { ApolloProvider, Query } from 'react-apollo';


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

const GET_USER_PRS = gql`
query GetPR($users: [ID!]!){
  nodes(ids:$users){
    ... on User {
      login,
      id,
      pullRequests(orderBy:{field: CREATED_AT, direction: DESC}, first: 20) {
        nodes{
          permalink,
          createdAt
        }
      }
    }
  }
}
`;

class App extends Component {
  constructor(props) {
    super(props);

    let allIDs = [];
    jsonData.huddles.forEach((huddle) => {     
      allIDs = allIDs.concat(huddle.huddle_members.map((user) => {

        return user.node_id;
      }));
    });


    this.state = {
      allIDs,
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
              query={GET_USER_PRS}
              variables={{users: state.allIDs }}

            >
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;

                return data.nodes.map(({ login, id }) => (
                  <div key={id}>
                    <p>
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
