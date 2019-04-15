import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import jsonData from '../data.json';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #0A1E2B;
  font-size: 2vw;
  text-align: center;
  background-color: #7D4241;
  width: 9em;
  height: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`;

const List = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin: auto;
  height: 70%;
`;

export default class HuddleList extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    const huddles = jsonData.huddles.map(huddle => huddle.huddle_lead);

    return (
      <List>
        {huddles.map((huddleLeader, index) => (
          <StyledLink key={huddleLeader} to={`/huddle/${index}`}>
            {`Team: ${huddleLeader}`}
          </StyledLink>
        ))}
      </List>
    );
  }
}
