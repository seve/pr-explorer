import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import query from '../graphql/queries';
import data from '../data.json';


export default class Huddle extends Component {
  constructor(props) {
    super(props);

    const { params } = props.match;


    const users = data.huddles[params.index].huddle_members;
    const ids = users.map(user => user.node_id);

    this.state = {
      ids,
    };
  }

  render() {
    const { state } = this;

    return (
      <Router>
        <Query {...{ query }} variables={{ users: state.ids }}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            const users = data.nodes.map(user => ({
              login: user.login,
              pullRequests: user.pullRequests.nodes,
            }));

            console.log(users.sort((a, b) => ((a.pullRequests.length > b.pullRequests.length) ? -1 : 1)));


            return users.map(user => <Link key={user.login} to={`/user/${user.login}`}>{`${user.login}: ${user.pullRequests.length} PRs`}</Link>);
          }}
        </Query>
      </Router>
    );
  }
}

Huddle.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
};
