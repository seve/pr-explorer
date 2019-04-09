import React from 'react';
import { Link } from 'react-router-dom';

import jsonData from '../data.json';

export default function HuddleList() {
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
