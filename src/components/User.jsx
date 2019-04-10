import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

import query from '../graphql/queries';

export default class User extends Component {
  constructor(props) {
    super(props);

    const { nodeID, index } = props.match.params;


    const userName = props.users[index].reduce((accum, user) => {
      console.log(user, nodeID);
      if (user.node_id == nodeID) {
        return user.name;
      }
      return accum;
    }, '');


    this.state = {
      nodeID,
      userName,
    };
  }

  render() {
    const { state, props } = this;
    const { index } = props.match.params;
    return (
      <div>
        <Link to={`/huddle/${index}`}>Back</Link>
        <Query {...{ query }} variables={{ users: state.nodeID }}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) {
              console.log(error);

              return <p>Error :(</p>;
            }
            const user = data.nodes[0];
            return (
              <>
                <h2>{state.userName}</h2>
                <h3>
                  Pull Requests(
                  {user.pullRequests.nodes.length}
                  )
                </h3>

                <div>
                  {user.pullRequests.nodes.map(pullRequest => (
                    <a
                      key={pullRequest.permalink}
                      href={pullRequest.permalink}
                    >
                      {pullRequest.createdAt}
                    </a>
                  ))}
                </div>
              </>

            );
          }}
        </Query>
      </div>
    );
  }
}
