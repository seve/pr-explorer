import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";


import query from '../graphql/queries';

export default class User extends Component {
  constructor(props) {
    super(props);

    const { nodeID, index } = props.match.params;


    const userName = props.users[index].reduce((accum, user) => {
      if (user.node_id == nodeID) {
        return user.name;
      }
      return accum;
    }, '');


    this.state = {
      nodeID,
      userName,
      startDate: new Date("2018-01-01"),
      endDate: new Date(),
    };

  }

  handleChangeEnd = (date) => {
    this.setState({
      endDate: date
    });
  }

  handleChangeStart = (date) => {
    this.setState({
      startDate: date
    });
  }
  

  render() {
    const { state, props } = this;
    const { index } = props.match.params;
    return (
      <div>
        <Link to={`/huddle/${index}`}>Back</Link>
        <>
          <DatePicker
            selected={state.startDate}
            selectsStart
            startDate={state.startDate}
            endDate={state.endDate}
            onChange={this.handleChangeStart}
          />

          <DatePicker
            selected={state.endDate}
            selectsEnd
            startDate={state.startDate}
            endDate={state.endDate}
            onChange={this.handleChangeEnd}
          />
        </>
        <Query {...{ query }} variables={{ users: state.nodeID }}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) {
              console.log(error);

              return <p>Error :(</p>;
            }
            const user = data.nodes[0];
            const validPRs = user.pullRequests.nodes.filter((pr) => {
              return new Date(pr.createdAt) <= state.endDate && new Date(pr.createdAt) >= state.startDate
            });

            console.log(validPRs)
            
            return (
              <>
                <h2>{state.userName}</h2>
                <h3>
                  Pull Requests(
                  {validPRs.length}
                  )
                </h3>

                <div>
                  {validPRs.map(pullRequest => 
                    <a key={pullRequest.createdAt} href={pullRequest.permalink}>pullRequest.createdAt</a>
                  
                  )}
                </div>
              </>

            );
          }}
        </Query>
      </div>
    );
  }
}
