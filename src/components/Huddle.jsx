import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';

import 'react-datepicker/dist/react-datepicker.css';


import query from '../graphql/queries';
import jsonData from '../data.json';

const StyledHuddle = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 40vw;
  text-align: center;
`;


export default class Huddle extends Component {
  constructor(props) {
    super(props);


    const { params } = props.match;


    const users = jsonData.huddles[params.index].huddle_members;
    const ids = users.map(user => user.node_id);

    this.state = {
      ids,
      startDate: new Date('2018-01-01'),
      endDate: new Date(),
    };
  }

  handleChangeEnd(date) {
    this.setState({
      endDate: date,
    });
  }

  handleChangeStart(date) {
    this.setState({
      startDate: date,
    });
  }

  render() {
    const { state, props } = this;
    const { params } = props.match;


    return (
      <StyledHuddle>
        <Link to="/">Back</Link>
        <DatePicker
          selected={state.startDate}
          selectsStart
          startDate={state.startDate}
          endDate={state.endDate}
          onChange={date => this.handleChangeStart(date)}
        />

        <DatePicker
          selected={state.endDate}
          selectsEnd
          startDate={state.startDate}
          endDate={state.endDate}
          onChange={date => this.handleChangeEnd(date)}
        />
        <Query {...{ query }} variables={{ users: state.ids }}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            const users = data.nodes.map(user => ({
              id: user.id,
              login: user.login,
              pullRequests: user.pullRequests.nodes
                .filter(pr => new Date(pr.createdAt) <= state.endDate
                  && new Date(pr.createdAt) >= state.startDate),
              name: props.users[params.index].reduce((accum, user1) => {
                if (user1.login === user.login) {
                  return user1.name;
                }
                return accum;
              }, ''),
            }));

            users.sort((a, b) => ((a.pullRequests.length > b.pullRequests.length) ? -1 : 1));


            return (
              <>
                <h2>{jsonData.huddles[params.index].huddle_lead}</h2>
                <h3>
                    Pull Requests(
                  {users.reduce((accum, user) => accum + user.pullRequests.length,
                    0)}
                    )
                </h3>
                {users.map(user => <Link key={user.login} to={`/huddle/${params.index}/user/${user.id}`}>{`${user.name}: ${user.pullRequests.length} PRs`}</Link>)}
              </>
            );
          }}
        </Query>
      </StyledHuddle>
    );
  }
}

Huddle.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  users: PropTypes.arrayOf(PropTypes.array).isRequired,
};
