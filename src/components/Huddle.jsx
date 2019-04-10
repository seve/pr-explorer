import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
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
    const { state, props } = this;
    const { params } = props.match;


    return (
      <>
        <Link to="/">Back</Link> 
        <Query {...{ query }} variables={{ users: state.ids }}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            const users = data.nodes.map(user => ({
              id: user.id,
              login: user.login,
              pullRequests: user.pullRequests.nodes,
              name: props.users[params.index].reduce((accum, user1) => {
                console.log('Looping: user:', user1, user1.login, '===', user.login);
                
                if (user1.login === user.login) {
                  console.log('entered', user1);
                  
                  return user1.name;
                }
                return accum;
              }, ''),
            }));

            console.log(props.users[params.index]);
            

            users.sort((a, b) => ((a.pullRequests.length > b.pullRequests.length) ? -1 : 1));


            return users.map(user => <Link key={user.login} to={`/huddle/${params.index}/user/${user.id}`}>{`${user.name}: ${user.pullRequests.length} PRs`}</Link>);
          }}
        </Query>
      </>
    );
  }
}

Huddle.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
  users: PropTypes.arrayOf(PropTypes.array).isRequired,
};
