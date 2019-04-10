import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';

import jsonData from '../data.json';
import "react-datepicker/dist/react-datepicker.css";


export default class HuddleList extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       startDate: new Date(),
       endDate: new Date(),
    }

    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
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
    const huddles = jsonData.huddles.map(huddle => huddle.huddle_lead);

    return (
      <>

      <DatePicker
          selected={this.state.startDate}
          selectsStart
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeStart}
      />

      <DatePicker
          selected={this.state.endDate}
          selectsEnd
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeEnd}
      />

        {huddles.map((huddleLeader, index) => (
          <Link key={huddleLeader} to={`/huddle/${index}`}>
            {`Team: ${huddleLeader}`}
          </Link>
        ))}
      </>
    );
  }
}
