import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import jsonData from '../data.json';


export default class HuddleList extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    const huddles = jsonData.huddles.map(huddle => huddle.huddle_lead);

    return (
      <>
        {huddles.map((huddleLeader, index) => (
          <Link key={huddleLeader} to={`/huddle/${index}`}>
            {`Team: ${huddleLeader}`}
          </Link>
        ))}
      </>
    );
  }
}
